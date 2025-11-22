// ajax.js
import { showSuccessMessage, showErrorMessage, showConnectionError } from './sweetalert.js';

const ajaxRequest = (url, method = 'POST', data = {}, options = {}) => {
    const isFormData = data instanceof FormData;

    return $.ajax({
        url,
        method,
        dataType: 'json',
        data,
        processData: !isFormData,
        contentType: isFormData ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
        ...options
    });
};

export const getAll = (url) => ajaxRequest(url, 'POST', { getAll: true });
export const getById = (url, id) => ajaxRequest(url, 'POST', { show: id });
export const remove = (url, id) => ajaxRequest(url, 'POST', { delete: id });

export const create = (url, data, options = {}) => {
    if (data instanceof FormData) {
        // Agregar el campo 'store' al FormData si no existe
        if (!data.has('store')) {
            data.append('store', '1');
        }
        return ajaxRequest(url, 'POST', data, options);
    }
    return ajaxRequest(url, 'POST', { ...data, store: true }, options);
};

export const update = (url, data, options = {}) => {
    if (data instanceof FormData) {
        // Agregar el campo 'update' al FormData si no existe
        if (!data.has('update')) {
            data.append('update', '1');
        }
        return ajaxRequest(url, 'POST', data, options);
    }
    return ajaxRequest(url, 'POST', { ...data, update: true }, options);
};

// Función para parsear respuestas mixtas (JSON/HTML)
const parseMixedResponse = (response) => {
    if (typeof response !== 'string') {
        return response;
    }

    // Si es HTML, buscar datos JSON dentro del HTML
    if (response.includes('<!DOCTYPE html>') || response.includes('<html')) {
        try {
            // Buscar script tags que contengan JSON
            const scriptMatch = response.match(/<script[^>]*>[\s\S]*?({[\s\S]*?})[\s\S]*?<\/script>/i);
            if (scriptMatch && scriptMatch[1]) {
                return JSON.parse(scriptMatch[1]);
            }

            // Buscar JSON directamente en el body
            const jsonMatch = response.match(/{[\s\S]*?}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (e) {
            console.warn('No se pudo extraer JSON del HTML:', e);
        }

        // Si no se puede extraer JSON, devolver error genérico
        return {
            success: false,
            message: 'Error del servidor: Respuesta en formato HTML inesperada'
        };
    }

    // Intentar parsear como JSON directo
    try {
        return JSON.parse(response);
    } catch (e) {
        return {
            success: false,
            message: 'Error: Respuesta del servidor no es JSON válido'
        };
    }
};

// Manejo mejorado de errores
const handleAjaxError = async (error) => {
    console.error('AJAX Error:', error);

    if (error.status === 0) {
        await showConnectionError();
        return;
    }

    if (error.responseJSON) {
        const errorMsg = error.responseJSON.message || error.responseJSON.error || 'Error del servidor';
        await showErrorMessage(errorMsg);
        return;
    }

    if (error.responseText) {
        const parsedResponse = parseMixedResponse(error.responseText);
        if (parsedResponse.message) {
            await showErrorMessage(parsedResponse.message);
            return;
        }
    }

    // Error genérico
    await showErrorMessage('Error de comunicación con el servidor');
};

export const executeAjax = async (ajaxPromise, successMessage = null, onSuccess = null) => {
    try {
        let response = await ajaxPromise;

        // Parsear respuesta mixta
        response = parseMixedResponse(response);

        if (response.success) {
            if (successMessage) await showSuccessMessage(successMessage);
            if (onSuccess) onSuccess(response);
            return true;
        }

        await showErrorMessage(response.message || 'Ha ocurrido un error');
        return false;
    } catch (error) {
        await handleAjaxError(error);
        return false;
    }
};