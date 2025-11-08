// ajax.js (corregido)
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
    const formData = data instanceof FormData ? data : { ...data, store: true };
    return ajaxRequest(url, 'POST', formData, options);
};

export const update = (url, data, options = {}) => {
    const formData = data instanceof FormData ? data : { ...data, update: true };
    return ajaxRequest(url, 'POST', formData, options);
};

export const executeAjax = async (ajaxPromise, successMessage = null, onSuccess = null) => {
    try {
        const response = await ajaxPromise;
        
        if (response.success) {
            if (successMessage) await showSuccessMessage(successMessage);
            if (onSuccess) onSuccess(response);
            return true;
        }
        
        await showErrorMessage(response.message || 'Ha ocurrido un error');
        return false;
    } catch (error) {
        console.error('AJAX Error:', error);
        await showConnectionError();
        return false;
    }
};