import { 
    validarCedula, 
    validarNombre, 
    validarApellido, 
    validarEmail, 
    validarTelefono 
} from './helpers/validation.js';

// Objetos para rastrear errores de validación
let erroresCrear = {
    cedula: false,
    nombre: false,
    apellido: false,
    email: false,
    telefono: false
};

let erroresEditar = {
    nombre: false,
    apellido: false,
    email: false,
    telefono: false
};

// Función para verificar si hay errores
function hayErrores(errores) {
    return Object.values(errores).some(error => error === true);
}

// Función para habilitar/deshabilitar botón de envío
function actualizarBotonEnvio(formulario, errores) {
    const botonEnvio = formulario.find('button[type="submit"]');
    const tieneErrores = hayErrores(errores);
    botonEnvio.prop('disabled', tieneErrores);
}

// Función genérica para validar campo en tiempo real
async function validarCampoTiempoReal(campo, validador, objetoErrores, campoKey, formulario) {
    const valido = await validador(campo);
    objetoErrores[campoKey] = !valido;
    actualizarBotonEnvio(formulario, objetoErrores);
}

// Validaciones para el formulario de crear cliente
function inicializarValidacionesCrear() {
    const formulario = $('#formAgregarCliente');
    
    // Validación de cédula
    $('#cedulaCliente').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarCedula, erroresCrear, 'cedula', formulario);
    });

    // Validación de nombre
    $('#nombreCliente').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarNombre, erroresCrear, 'nombre', formulario);
    });

    // Validación de apellido
    $('#apellidoCliente').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarApellido, erroresCrear, 'apellido', formulario);
    });

    // Validación de email
    $('#emailCliente').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarEmail, erroresCrear, 'email', formulario);
    });

    // Validación de teléfono
    $('#telefonoCliente').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarTelefono, erroresCrear, 'telefono', formulario);
    });

    // Validación al enviar el formulario
    formulario.on('submit', function(e) {
        // Verificar si hay errores
        if (hayErrores(erroresCrear)) {
            e.preventDefault();
            alert('Por favor, corrija los errores en el formulario antes de enviar ❌');
            return false;
        }
        
        // Si no hay errores, permitir el envío normal del formulario
        return true;
    });

    // Limpiar validaciones cuando se cierre el modal
    $('#agregarClienteModal').on('hidden.bs.modal', function() {
        formulario[0].reset();
        formulario.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        // Resetear errores a false (estado inicial sin errores)
        Object.keys(erroresCrear).forEach(key => {
            erroresCrear[key] = false;
        });
        formulario.find('button[type="submit"]').prop('disabled', false);
    });
}

// Validaciones para el formulario de editar cliente
function inicializarValidacionesEditar() {
    const formulario = $('#formEditarCliente');
    
    // Validación de nombre
    $('#editarNombre').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarNombre, erroresEditar, 'nombre', formulario);
    });

    // Validación de apellido
    $('#editarApellido').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarApellido, erroresEditar, 'apellido', formulario);
    });

    // Validación de email
    $('#editarCorreo').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarEmail, erroresEditar, 'email', formulario);
    });

    // Validación de teléfono
    $('#editarTelefono').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarTelefono, erroresEditar, 'telefono', formulario);
    });

    // Validación al enviar el formulario
    formulario.on('submit', function(e) {
        // Verificar si hay errores
        if (hayErrores(erroresEditar)) {
            e.preventDefault();
            alert('Por favor, corrija los errores en el formulario antes de enviar ❌');
            return false;
        }
        
        // Si no hay errores, permitir el envío normal del formulario
        return true;
    });

    // Limpiar validaciones cuando se cierre el modal
    $('#editarClienteModal').on('hidden.bs.modal', function() {
        formulario.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        // Resetear errores a false (estado inicial sin errores)
        Object.keys(erroresEditar).forEach(key => {
            erroresEditar[key] = false;
        });
        formulario.find('button[type="submit"]').prop('disabled', false);
    });
}

// Inicializar validaciones cuando el documento esté listo
$(document).ready(function() {
    // Inicializar validaciones para ambos formularios
    inicializarValidacionesCrear();
    inicializarValidacionesEditar();
    
    // Habilitar botones de envío inicialmente (sin errores)
    $('#formAgregarCliente button[type="submit"]').prop('disabled', false);
    $('#formEditarCliente button[type="submit"]').prop('disabled', false);
});

// Exportar funciones para uso externo si es necesario
export {
    inicializarValidacionesCrear,
    inicializarValidacionesEditar
};
