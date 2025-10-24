import { 
    validarCedula, 
    validarNombre, 
    validarApellido, 
    validarEmail, 
    validarTelefono 
} from './helpers/validation.js';

// Variables globales para almacenar el estado de validación
let validacionesCrear = {
    cedula: false,
    nombre: false,
    apellido: false,
    email: false,
    telefono: false
};

let validacionesEditar = {
    nombre: false,
    apellido: false,
    email: false,
    telefono: false
};

// Función para verificar si todas las validaciones son correctas
function verificarValidacionesCompletas(validaciones) {
    return Object.values(validaciones).every(val => val === true);
}

// Función para habilitar/deshabilitar botón de envío
function actualizarBotonEnvio(formulario, validaciones) {
    const botonEnvio = formulario.find('button[type="submit"]');
    if (verificarValidacionesCompletas(validaciones)) {
        botonEnvio.prop('disabled', false);
    } else {
        botonEnvio.prop('disabled', true);
    }
}

// Validaciones para el formulario de crear cliente
function inicializarValidacionesCrear() {
    const formulario = $('#formAgregarCliente');
    
    // Validación de cédula
    $('#cedulaCliente').on('blur', async function() {
        const campo = $(this);
        validacionesCrear.cedula = await validarCedula(campo);
        actualizarBotonEnvio(formulario, validacionesCrear);
    });

    // Validación de nombre
    $('#nombreCliente').on('blur', async function() {
        const campo = $(this);
        validacionesCrear.nombre = await validarNombre(campo);
        actualizarBotonEnvio(formulario, validacionesCrear);
    });

    // Validación de apellido
    $('#apellidoCliente').on('blur', async function() {
        const campo = $(this);
        validacionesCrear.apellido = await validarApellido(campo);
        actualizarBotonEnvio(formulario, validacionesCrear);
    });

    // Validación de email
    $('#emailCliente').on('blur', async function() {
        const campo = $(this);
        validacionesCrear.email = await validarEmail(campo);
        actualizarBotonEnvio(formulario, validacionesCrear);
    });

    // Validación de teléfono
    $('#telefonoCliente').on('blur', async function() {
        const campo = $(this);
        validacionesCrear.telefono = await validarTelefono(campo);
        actualizarBotonEnvio(formulario, validacionesCrear);
    });

    // Validación al enviar el formulario
    formulario.on('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        const cedula = $('#cedulaCliente');
        const nombre = $('#nombreCliente');
        const apellido = $('#apellidoCliente');
        const email = $('#emailCliente');
        const telefono = $('#telefonoCliente');

        const cedulaValida = await validarCedula(cedula);
        const nombreValido = await validarNombre(nombre);
        const apellidoValido = await validarApellido(apellido);
        const emailValido = await validarEmail(email);
        const telefonoValido = await validarTelefono(telefono);

        if (cedulaValida && nombreValido && apellidoValido && emailValido && telefonoValido) {
            // Si todas las validaciones son correctas, enviar el formulario
            this.submit();
        } else {
            // Mostrar mensaje de error
            alert('Por favor, corrija los errores en el formulario antes de enviar.');
        }
    });

    // Limpiar validaciones cuando se cierre el modal
    $('#agregarClienteModal').on('hidden.bs.modal', function() {
        formulario[0].reset();
        formulario.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        Object.keys(validacionesCrear).forEach(key => {
            validacionesCrear[key] = false;
        });
        formulario.find('button[type="submit"]').prop('disabled', true);
    });
}

// Validaciones para el formulario de editar cliente
function inicializarValidacionesEditar() {
    const formulario = $('#formEditarCliente');
    
    // Validación de nombre
    $('#editarNombre').on('blur', async function() {
        const campo = $(this);
        validacionesEditar.nombre = await validarNombre(campo);
        actualizarBotonEnvio(formulario, validacionesEditar);
    });

    // Validación de apellido
    $('#editarApellido').on('blur', async function() {
        const campo = $(this);
        validacionesEditar.apellido = await validarApellido(campo);
        actualizarBotonEnvio(formulario, validacionesEditar);
    });

    // Validación de email
    $('#editarCorreo').on('blur', async function() {
        const campo = $(this);
        validacionesEditar.email = await validarEmail(campo);
        actualizarBotonEnvio(formulario, validacionesEditar);
    });

    // Validación de teléfono
    $('#editarTelefono').on('blur', async function() {
        const campo = $(this);
        validacionesEditar.telefono = await validarTelefono(campo);
        actualizarBotonEnvio(formulario, validacionesEditar);
    });

    // Validación al enviar el formulario
    formulario.on('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        const nombre = $('#editarNombre');
        const apellido = $('#editarApellido');
        const email = $('#editarCorreo');
        const telefono = $('#editarTelefono');

        const nombreValido = await validarNombre(nombre);
        const apellidoValido = await validarApellido(apellido);
        const emailValido = await validarEmail(email);
        const telefonoValido = await validarTelefono(telefono);

        if (nombreValido && apellidoValido && emailValido && telefonoValido) {
            // Si todas las validaciones son correctas, enviar el formulario
            this.submit();
        } else {
            // Mostrar mensaje de error
            alert('Por favor, corrija los errores en el formulario antes de enviar.');
        }
    });

    // Limpiar validaciones cuando se cierre el modal
    $('#editarClienteModal').on('hidden.bs.modal', function() {
        formulario.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        Object.keys(validacionesEditar).forEach(key => {
            validacionesEditar[key] = false;
        });
        formulario.find('button[type="submit"]').prop('disabled', true);
    });
}

// Inicializar validaciones cuando el documento esté listo
$(document).ready(function() {
    // Inicializar validaciones para ambos formularios
    inicializarValidacionesCrear();
    inicializarValidacionesEditar();
    
    // Deshabilitar botones de envío inicialmente
    $('#formAgregarCliente button[type="submit"]').prop('disabled', true);
    $('#formEditarCliente button[type="submit"]').prop('disabled', true);
});

// Exportar funciones para uso externo si es necesario
export {
    inicializarValidacionesCrear,
    inicializarValidacionesEditar
};
