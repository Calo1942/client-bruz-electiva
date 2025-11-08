// sweetalert.js (corregido)
const colors = {
    success: '#229645',
    danger: '#b92727',
    warning: '#f0ad4e',
    info: '#0d6efd',
    secondary: '#808080'
};

const commonConfig = {
    allowOutsideClick: false,
    allowEscapeKey: true,
    showClass: { popup: 'animate__animated animate__fadeInDown animate__faster' },
    hideClass: { popup: 'animate__animated animate__fadeOutUp animate__faster' },
    buttonsStyling: true,
    reverseButtons: false
};

function createAlert(icon, title, text, confirmButtonText, color, options = {}) {
    if (typeof Swal === 'undefined') {
        alert(`${title}: ${text}`);
        return Promise.resolve();
    }
    
    return Swal.fire({
        ...commonConfig,
        title,
        text,
        icon,
        iconColor: color,
        confirmButtonText,
        confirmButtonColor: color,
        ...options
    });
}

// Exportaciones corregidas
export const showSuccess = (title = '¡Éxito!', text = 'Operación realizada correctamente', confirmButtonText = 'Aceptar', options = {}) =>
    createAlert('success', title, text, confirmButtonText, colors.success, options);

export const showError = (title = '¡Error!', text = 'Ha ocurrido un error', confirmButtonText = 'Aceptar', options = {}) =>
    createAlert('error', title, text, confirmButtonText, colors.danger, options);

export const showWarning = (title = '¡Advertencia!', text = 'Verifique la información', confirmButtonText = 'Entendido', options = {}) =>
    createAlert('warning', title, text, confirmButtonText, colors.warning, options);

export const showInfo = (title = 'Información', text = '', confirmButtonText = 'Aceptar', options = {}) =>
    createAlert('info', title, text, confirmButtonText, colors.info, options);

export const showConfirm = (title = '¿Estás seguro?', text = 'Esta acción no se puede deshacer', confirmButtonText = 'Sí, continuar', cancelButtonText = 'Cancelar') =>
    Swal.fire({
        ...commonConfig,
        title,
        text,
        icon: 'warning',
        iconColor: colors.warning,
        showCancelButton: true,
        confirmButtonColor: colors.danger,
        cancelButtonColor: colors.secondary,
        confirmButtonText,
        cancelButtonText
    }).then(result => result.isConfirmed);

// Agregar las funciones que faltaban
export const showErrorMessage = (message, title = '¡Error!') => 
    showError(title, message);

export const showSuccessMessage = (message, title = '¡Éxito!') => 
    showSuccess(title, message);

export const showConnectionError = () => 
    showError('Error de conexión', 'No se pudo conectar con el servidor. Verifique su conexión e intente nuevamente.', 'Reintentar');

export const showLoading = (title = 'Cargando...', text = 'Por favor espere') => {
    if (typeof Swal === 'undefined') return;
    
    Swal.fire({
        ...commonConfig,
        title,
        text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading()
    });
};

export const closeLoading = () => Swal.close();