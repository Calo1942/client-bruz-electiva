import { showSuccessMessage, showErrorMessage, showConnectionError } from './sweetalert.js';


export function ajaxRequest(url, method = 'POST', data = {}, options = {}) {
    const defaultOptions = {
        url: url,
        method: method,
        dataType: 'json',
        data: data,
        processData: options.processData !== undefined ? options.processData : true,
        contentType: options.contentType !== undefined ? options.contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        converters: {
            'text json': function(text) {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    console.error('Error parsing JSON:', text);
                    throw e;
                }
            }
        }
    };

    if (data instanceof FormData) {
        defaultOptions.processData = false;
        defaultOptions.contentType = false;
    }

    const ajaxOptions = { ...defaultOptions, ...options };

    return $.ajax(ajaxOptions);
}

export function getAll(url) {
    return ajaxRequest(url, 'POST', { getAll: true });
}

export function getById(url, id) {
    return ajaxRequest(url, 'POST', { show: id });
}

export function create(url, data, options = {}) {
    let formData;
    if (data instanceof FormData) {
        formData = data;
        formData.append('store', true);
    } else {
        formData = { ...data, store: true };
    }
    return ajaxRequest(url, 'POST', formData, options);
}


export function update(url, data, options = {}) {
    let formData;
    if (data instanceof FormData) {
        formData = data;
        formData.append('update', true);
    } else {
        formData = { ...data, update: true };
    }
    return ajaxRequest(url, 'POST', formData, options);
}

export function remove(url, id) {
    return ajaxRequest(url, 'POST', { delete: id });
}


export async function handleResponse(response, successMessage = null, onSuccess = null) {
    if (response.success) {
        if (successMessage) {
            await showSuccessMessage(successMessage);
        }
        if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
        }
        return true;
    } else {
        const errorMessage = response.message || 'Ha ocurrido un error';
        await showErrorMessage(errorMessage);
        return false;
    }
}

export async function handleError(xhr, status, error) {
    console.error('Error AJAX:', { xhr, status, error });
    await showConnectionError();
}

export async function executeAjax(ajaxPromise, successMessage = null, onSuccess = null) {
    try {
        const response = await ajaxPromise;
        
        let parsedResponse = response;
        if (typeof response === 'string') {
            try {
                const cleanedResponse = response.trim();
                const jsonStart = cleanedResponse.search(/[\{\[]/);
                if (jsonStart > 0) {    
                    parsedResponse = JSON.parse(cleanedResponse.substring(jsonStart));
                } else {
                    parsedResponse = JSON.parse(cleanedResponse);
                }
            } catch (e) {
                console.error('Error parsing JSON response:', response);
                console.error('Parse error:', e);
                const preview = response.substring(0, 200);
                await showErrorMessage(`Error al procesar la respuesta del servidor. La respuesta no es un JSON válido. Respuesta recibida: ${preview}...`);
                return false;
            }
        }
        
        if (!parsedResponse || typeof parsedResponse !== 'object') {
            console.error('Invalid response format:', parsedResponse);
            await showErrorMessage('Error: La respuesta del servidor no tiene el formato esperado.');
            return false;
        }
        
        return await handleResponse(parsedResponse, successMessage, onSuccess);
    } catch (error) {
        console.error('AJAX Error:', error);
            
        if (error.responseJSON) {
            const errorMsg = error.responseJSON.message || error.responseJSON.error || 'Ha ocurrido un error';
            await showErrorMessage(errorMsg);
        } else if (error.responseText) {
            try {
                const errorData = JSON.parse(error.responseText);
                const errorMsg = errorData.message || errorData.error || 'Ha ocurrido un error';
                await showErrorMessage(errorMsg);
            } catch (e) {
                await showConnectionError();
            }
        } else if (error.status === 0) {
            await showConnectionError();
        } else {
            await handleError(error.xhr || {}, error.status || 'error', error.message || 'Error desconocido');
        }
        
        return false;
    }
}

