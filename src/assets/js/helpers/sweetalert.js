
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


export function showConnectionError() {
    return showError(
        'Error de conexión',
        'No se pudo conectar con el servidor. Por favor, verifique su conexión a internet e intente nuevamente.',
        'Reintentar'
    );
}


export function showErrorMessage(message, title = '¡Error!') {
    return showError(title, message);
}


export function showSuccessMessage(message, title = '¡Éxito!', timer = null) {
    return showSuccess(title, message, 'Aceptar', timer ? { timer } : {});
}


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


export function closeLoading() {
    if (typeof Swal !== 'undefined') {
        Swal.close();
    }
}


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

