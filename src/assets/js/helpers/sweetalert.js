/**
 * Módulo SweetAlert - Alertas modulares y reutilizables
 * Proporciona funciones para mostrar alertas consistentes en toda la aplicación
 * Utiliza la paleta de colores del sistema para mantener consistencia visual
 */

// Verificar que SweetAlert2 esté disponible
if (typeof Swal === 'undefined') {
    console.error('SweetAlert2 no está cargado. Asegúrate de incluir la librería antes de usar este módulo.');
}

// Configuración de colores del sistema
const colors = {
    primary: '#a52828',
    primaryHover: '#8b2020',
    success: '#229645',
    successHover: '#2a7e3b',
    danger: '#b92727',
    dangerHover: '#a52828',
    warning: '#f0ad4e',
    warningHover: '#e09d3e',
    info: '#0d6efd',
    infoHover: '#0b5ed7',
    secondary: '#808080',
    secondaryHover: '#737373'
};

// Configuración común para todas las alertas
const commonConfig = {
    allowOutsideClick: false,
    allowEscapeKey: true,
    showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
    },
    customClass: {
        popup: 'sweet-alert-custom',
        title: 'sweet-alert-title',
        htmlContainer: 'sweet-alert-content',
        confirmButton: 'sweet-alert-confirm',
        cancelButton: 'sweet-alert-cancel'
    },
    buttonsStyling: true,
    reverseButtons: false
};

/**
 * Muestra una alerta de éxito
 * @param {string} title - Título de la alerta
 * @param {string} text - Texto del mensaje
 * @param {string} confirmButtonText - Texto del botón de confirmación
 * @param {object} options - Opciones adicionales
 * @returns {Promise} Promise que se resuelve cuando el usuario cierra la alerta
 */
export function showSuccess(title = '¡Éxito!', text = 'Operación realizada correctamente', confirmButtonText = 'Aceptar', options = {}) {
    if (typeof Swal === 'undefined') {
        console.error('SweetAlert2 no está disponible');
        alert(title + ': ' + text);
        return Promise.resolve();
    }
    return Swal.fire({
        ...commonConfig,
        title: title,
        text: text,
        icon: 'success',
        iconColor: colors.success,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: colors.success,
        timer: options.timer || null,
        timerProgressBar: options.timer ? true : false,
        ...options
    });
}

/**
 * Muestra una alerta de error
 * @param {string} title - Título de la alerta
 * @param {string} text - Texto del mensaje
 * @param {string} confirmButtonText - Texto del botón de confirmación
 * @param {object} options - Opciones adicionales
 * @returns {Promise} Promise que se resuelve cuando el usuario cierra la alerta
 */
export function showError(title = '¡Error!', text = 'Ha ocurrido un error. Por favor, intente nuevamente.', confirmButtonText = 'Aceptar', options = {}) {
    if (typeof Swal === 'undefined') {
        console.error('SweetAlert2 no está disponible');
        alert(title + ': ' + text);
        return Promise.resolve();
    }
    return Swal.fire({
        ...commonConfig,
        title: title,
        text: text,
        icon: 'error',
        iconColor: colors.danger,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: colors.danger,
        ...options
    });
}

/**
 * Muestra una alerta de advertencia
 * @param {string} title - Título de la alerta
 * @param {string} text - Texto del mensaje
 * @param {string} confirmButtonText - Texto del botón de confirmación
 * @param {object} options - Opciones adicionales
 * @returns {Promise} Promise que se resuelve cuando el usuario cierra la alerta
 */
export function showWarning(title = '¡Advertencia!', text = 'Por favor, verifique la información antes de continuar.', confirmButtonText = 'Entendido', options = {}) {
    return Swal.fire({
        ...commonConfig,
        title: title,
        text: text,
        icon: 'warning',
        iconColor: colors.warning,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: colors.warning,
        ...options
    });
}

/**
 * Muestra una alerta de información
 * @param {string} title - Título de la alerta
 * @param {string} text - Texto del mensaje
 * @param {string} confirmButtonText - Texto del botón de confirmación
 * @param {object} options - Opciones adicionales
 * @returns {Promise} Promise que se resuelve cuando el usuario cierra la alerta
 */
export function showInfo(title = 'Información', text = '', confirmButtonText = 'Aceptar', options = {}) {
    return Swal.fire({
        ...commonConfig,
        title: title,
        text: text,
        icon: 'info',
        iconColor: colors.info,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: colors.info,
        ...options
    });
}

/**
 * Muestra un diálogo de confirmación
 * @param {string} title - Título del diálogo
 * @param {string} text - Texto del mensaje
 * @param {string} confirmButtonText - Texto del botón de confirmación
 * @param {string} cancelButtonText - Texto del botón de cancelación
 * @param {object} options - Opciones adicionales
 * @returns {Promise} Promise que se resuelve con el resultado (true si confirma, false si cancela)
 */
export function showConfirm(title = '¿Estás seguro?', text = 'Esta acción no se puede deshacer. ¿Desea continuar?', confirmButtonText = 'Sí, continuar', cancelButtonText = 'Cancelar', options = {}) {
    return Swal.fire({
        ...commonConfig,
        title: title,
        text: text,
        icon: 'warning',
        iconColor: colors.warning,
        showCancelButton: true,
        confirmButtonColor: colors.danger,
        cancelButtonColor: colors.secondary,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        focusConfirm: false,
        focusCancel: true,
        ...options
    }).then((result) => {
        return result.isConfirmed;
    });
}

/**
 * Muestra una alerta de error de conexión
 * @returns {Promise} Promise que se resuelve cuando el usuario cierra la alerta
 */
export function showConnectionError() {
    return showError(
        'Error de conexión',
        'No se pudo conectar con el servidor. Por favor, verifique su conexión a internet e intente nuevamente.',
        'Reintentar'
    );
}

/**
 * Muestra una alerta de error con mensaje personalizado
 * @param {string} message - Mensaje de error
 * @param {string} title - Título personalizado (opcional)
 * @returns {Promise} Promise que se resuelve cuando el usuario cierra la alerta
 */
export function showErrorMessage(message, title = '¡Error!') {
    return showError(title, message);
}

/**
 * Muestra una alerta de éxito con mensaje personalizado
 * @param {string} message - Mensaje de éxito
 * @param {string} title - Título personalizado (opcional)
 * @param {number} timer - Tiempo en ms para auto-cerrar (opcional)
 * @returns {Promise} Promise que se resuelve cuando el usuario cierra la alerta
 */
export function showSuccessMessage(message, title = '¡Éxito!', timer = null) {
    return showSuccess(title, message, 'Aceptar', timer ? { timer } : {});
}

/**
 * Muestra una alerta de carga (loading)
 * @param {string} title - Título de la alerta
 * @param {string} text - Texto del mensaje
 * @returns {Promise} Promise que se resuelve cuando se cierra la alerta
 */
export function showLoading(title = 'Cargando...', text = 'Por favor espere') {
    if (typeof Swal === 'undefined') {
        console.warn('SweetAlert2 no está disponible, no se puede mostrar loading');
        return;
    }
    Swal.fire({
        ...commonConfig,
        title: title,
        text: text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

/**
 * Cierra la alerta de carga actual
 */
export function closeLoading() {
    if (typeof Swal !== 'undefined') {
        Swal.close();
    }
}

/**
 * Muestra una alerta de éxito con auto-cierre
 * @param {string} message - Mensaje de éxito
 * @param {number} timer - Tiempo en ms antes de cerrar (default: 2000)
 * @returns {Promise} Promise que se resuelve cuando se cierra la alerta
 */
export function showSuccessToast(message, timer = 2000) {
    return Swal.fire({
        ...commonConfig,
        title: message,
        icon: 'success',
        iconColor: colors.success,
        confirmButtonColor: colors.success,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
    });
}

