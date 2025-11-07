/**
 * Módulo AJAX - Operaciones CRUD comunes
 * Proporciona funciones reutilizables para operaciones AJAX
 */

import { showSuccessMessage, showErrorMessage, showConnectionError } from './sweetalert.js';

/**
 * Realiza una petición AJAX genérica
 * @param {string} url - URL del endpoint
 * @param {string} method - Método HTTP (GET, POST, etc.)
 * @param {object|FormData} data - Datos a enviar
 * @param {object} options - Opciones adicionales (processData, contentType, etc.)
 * @returns {Promise} Promise que se resuelve con la respuesta
 */
export function ajaxRequest(url, method = 'POST', data = {}, options = {}) {
    const defaultOptions = {
        url: url,
        method: method,
        dataType: 'json', // Cambiar a minúscula para consistencia
        data: data,
        processData: options.processData !== undefined ? options.processData : true,
        contentType: options.contentType !== undefined ? options.contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        // Asegurar que siempre se intente parsear como JSON
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

    // Si data es FormData, ajustar opciones automáticamente
    if (data instanceof FormData) {
        defaultOptions.processData = false;
        defaultOptions.contentType = false;
    }

    // Combinar con opciones personalizadas
    const ajaxOptions = { ...defaultOptions, ...options };

    return $.ajax(ajaxOptions);
}

/**
 * Obtiene todos los registros
 * @param {string} url - URL del endpoint
 * @returns {Promise} Promise que se resuelve con los datos
 */
export function getAll(url) {
    return ajaxRequest(url, 'POST', { getAll: true });
}

/**
 * Obtiene un registro por ID
 * @param {string} url - URL del endpoint
 * @param {string|number} id - ID del registro
 * @returns {Promise} Promise que se resuelve con los datos
 */
export function getById(url, id) {
    return ajaxRequest(url, 'POST', { show: id });
}

/**
 * Crea un nuevo registro
 * @param {string} url - URL del endpoint
 * @param {object|FormData} data - Datos del registro
 * @param {object} options - Opciones adicionales
 * @returns {Promise} Promise que se resuelve con la respuesta
 */
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

/**
 * Actualiza un registro
 * @param {string} url - URL del endpoint
 * @param {object|FormData} data - Datos del registro (debe incluir el ID)
 * @param {object} options - Opciones adicionales
 * @returns {Promise} Promise que se resuelve con la respuesta
 */
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

/**
 * Elimina un registro
 * @param {string} url - URL del endpoint
 * @param {string|number} id - ID del registro a eliminar
 * @returns {Promise} Promise que se resuelve con la respuesta
 */
export function remove(url, id) {
    return ajaxRequest(url, 'POST', { delete: id });
}

/**
 * Maneja la respuesta de una operación AJAX
 * @param {object} response - Respuesta del servidor
 * @param {string} successMessage - Mensaje de éxito a mostrar
 * @param {function} onSuccess - Callback a ejecutar en caso de éxito
 * @returns {boolean} true si fue exitoso, false en caso contrario
 */
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

/**
 * Maneja errores de peticiones AJAX
 * @param {object} xhr - Objeto XMLHttpRequest
 * @param {string} status - Estado de la petición
 * @param {string} error - Mensaje de error
 */
export async function handleError(xhr, status, error) {
    console.error('Error AJAX:', { xhr, status, error });
    await showConnectionError();
}

/**
 * Wrapper para operaciones AJAX con manejo automático de errores
 * @param {Promise} ajaxPromise - Promise de la petición AJAX
 * @param {string} successMessage - Mensaje de éxito
 * @param {function} onSuccess - Callback de éxito
 * @returns {Promise} Promise que se resuelve con el resultado
 */
export async function executeAjax(ajaxPromise, successMessage = null, onSuccess = null) {
    try {
        const response = await ajaxPromise;
        
        // Verificar si la respuesta es un string (JSON no parseado)
        let parsedResponse = response;
        if (typeof response === 'string') {
            try {
                // Limpiar posibles espacios en blanco o caracteres antes del JSON
                const cleanedResponse = response.trim();
                // Buscar el primer { o [ que indica el inicio del JSON
                const jsonStart = cleanedResponse.search(/[\{\[]/);
                if (jsonStart > 0) {
                    // Hay texto antes del JSON, extraer solo la parte JSON
                    parsedResponse = JSON.parse(cleanedResponse.substring(jsonStart));
                } else {
                    parsedResponse = JSON.parse(cleanedResponse);
                }
            } catch (e) {
                console.error('Error parsing JSON response:', response);
                console.error('Parse error:', e);
                // Intentar mostrar al menos parte de la respuesta para debug
                const preview = response.substring(0, 200);
                await showErrorMessage(`Error al procesar la respuesta del servidor. La respuesta no es un JSON válido. Respuesta recibida: ${preview}...`);
                return false;
            }
        }
        
        // Verificar si la respuesta tiene la estructura esperada
        if (!parsedResponse || typeof parsedResponse !== 'object') {
            console.error('Invalid response format:', parsedResponse);
            await showErrorMessage('Error: La respuesta del servidor no tiene el formato esperado.');
            return false;
        }
        
        return await handleResponse(parsedResponse, successMessage, onSuccess);
    } catch (error) {
        console.error('AJAX Error:', error);
        
        // Manejar diferentes tipos de errores
        if (error.responseJSON) {
            // Error con respuesta JSON del servidor
            const errorMsg = error.responseJSON.message || error.responseJSON.error || 'Ha ocurrido un error';
            await showErrorMessage(errorMsg);
        } else if (error.responseText) {
            // Intentar parsear el texto de respuesta
            try {
                const errorData = JSON.parse(error.responseText);
                const errorMsg = errorData.message || errorData.error || 'Ha ocurrido un error';
                await showErrorMessage(errorMsg);
            } catch (e) {
                // Si no es JSON, mostrar el texto o un mensaje genérico
                await showConnectionError();
            }
        } else if (error.status === 0) {
            // Error de conexión
            await showConnectionError();
        } else {
            // Error desconocido
            await handleError(error.xhr || {}, error.status || 'error', error.message || 'Error desconocido');
        }
        
        return false;
    }
}

