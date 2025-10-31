import { 
    validarNombre
} from '../helpers/validation.js';

// Objetos para rastrear errores de validación
let erroresCrear = {
    nombre: false
};

let erroresEditar = {
    nombre: false
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

// Validaciones para el formulario de crear categoría
function inicializarValidacionesCrear() {
    const formulario = $('#formAgregarCategoria');
    
    // Validación de nombre
    $('#nombreCategoria').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarNombre, erroresCrear, 'nombre', formulario);
    });

    // Validación al enviar el formulario - solo validar, no prevenir envío
    formulario.on('submit', function(e) {
        // Verificar si hay errores
        if (hayErrores(erroresCrear)) {
            e.preventDefault();
            alert('Por favor, corrija los errores en el formulario antes de enviar ❌');
            return false;
        }
        
        // Si no hay errores, permitir el envío (el AJAX handler se encargará)
        return true;
    });

    // Limpiar validaciones cuando se cierre el modal
    $('#agregarCategoriaModal').on('hidden.bs.modal', function() {
        formulario[0].reset();
        formulario.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        // Resetear errores a false (estado inicial sin errores)
        Object.keys(erroresCrear).forEach(key => {
            erroresCrear[key] = false;
        });
        formulario.find('button[type="submit"]').prop('disabled', false);
    });
}

// Validaciones para el formulario de editar categoría
function inicializarValidacionesEditar() {
    const formulario = $('#formEditarCategoria');
    
    // Validación de nombre
    $('#editarNombreCategoria').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarNombre, erroresEditar, 'nombre', formulario);
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
    $('#editarCategoriaModal').on('hidden.bs.modal', function() {
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
    $('#formAgregarCategoria button[type="submit"]').prop('disabled', false);
    $('#formEditarCategoria button[type="submit"]').prop('disabled', false);
});

// Exportar funciones para uso externo si es necesario
export {
    inicializarValidacionesCrear,
    inicializarValidacionesEditar
};

