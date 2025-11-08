import { 
    validarTexto,
    validarDescripcion,
    validarPrecio,
    validarCategoria,
    validarStock
} from '../helpers/validation.js';

// Objetos para rastrear errores de validación
let erroresCrear = {
    nombre: false,
    descripcion: false,
    stock: false,
    precio_detal: false,
    precio_mayor: false,
    id_categoria: false
};

let erroresEditar = {
    nombre: false,
    descripcion: false,
    stock: false,
    precio_detal: false,
    precio_mayor: false,
    id_categoria: false
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

// Validaciones para el formulario de crear producto
function inicializarValidacionesCrear() {
    const formulario = $('#formAgregarProducto');
    
    // Validación de nombre
    $('#nombreProducto').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarTexto, erroresCrear, 'nombre', formulario);
    });

    // Validación de descripción (opcional)
    $('#descripcionProducto').on('input', async function() {
        const campo = $(this);
        const valor = campo.val().trim();
        if (valor === '') {
            // Si está vacío, es válido (es opcional)
            campo.removeClass('is-invalid is-valid');
            erroresCrear.descripcion = false;
            actualizarBotonEnvio(formulario, erroresCrear);
        } else {
            await validarCampoTiempoReal(campo, validarDescripcion, erroresCrear, 'descripcion', formulario);
        }
    });

    $('#stockProducto').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarStock, erroresCrear, 'stock', formulario);
    });
    // Validación de precio detal
    $('#detalProducto').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarPrecio, erroresCrear, 'precio_detal', formulario);
    });

    // Validación de precio mayor (opcional, pero si tiene valor debe ser válido)
    $('#mayorProducto').on('input', async function() {
        const campo = $(this);
        const valor = campo.val().trim();
        if (valor === '') {
            // Si está vacío, es válido (es opcional)
            campo.removeClass('is-invalid is-valid');
            erroresCrear.precio_mayor = false;
            actualizarBotonEnvio(formulario, erroresCrear);
        } else {
            await validarCampoTiempoReal(campo, validarPrecio, erroresCrear, 'precio_mayor', formulario);
        }
    });

    // Validación de categoría
    $('#categoriaProducto').on('change', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarCategoria, erroresCrear, 'id_categoria', formulario);
    });

    // Validación al enviar el formulario
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
    $('#agregarProductoModal').on('hidden.bs.modal', function() {
        formulario[0].reset();
        formulario.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        // Resetear errores a false (estado inicial sin errores)
        Object.keys(erroresCrear).forEach(key => {
            erroresCrear[key] = false;
        });
        formulario.find('button[type="submit"]').prop('disabled', false);
    });
}

// Validaciones para el formulario de editar producto
function inicializarValidacionesEditar() {
    const formulario = $('#formEditarProducto');
    
    // Validación de nombre
    $('#editarNombreProducto').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarTexto, erroresEditar, 'nombre', formulario);
    });

    // Validación de descripción (opcional)
    $('#editarDescripcionProducto').on('input', async function() {
        const campo = $(this);
        const valor = campo.val().trim();
        if (valor === '') {
            // Si está vacío, es válido (es opcional)
            campo.removeClass('is-invalid is-valid');
            erroresEditar.descripcion = false;
            actualizarBotonEnvio(formulario, erroresEditar);
        } else {
            await validarCampoTiempoReal(campo, validarDescripcion, erroresEditar, 'descripcion', formulario);
        }
    });

    $('#editarStockProducto').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarStock, erroresCrear, 'stock', formulario);
    });

    // Validación de precio detal
    $('#editarDetalProducto').on('input', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarPrecio, erroresEditar, 'precio_detal', formulario);
    });

    // Validación de precio mayor (opcional, pero si tiene valor debe ser válido)
    $('#editarMayorProducto').on('input', async function() {
        const campo = $(this);
        const valor = campo.val().trim();
        if (valor === '') {
            // Si está vacío, es válido (es opcional)
            campo.removeClass('is-invalid is-valid');
            erroresEditar.precio_mayor = false;
            actualizarBotonEnvio(formulario, erroresEditar);
        } else {
            await validarCampoTiempoReal(campo, validarPrecio, erroresEditar, 'precio_mayor', formulario);
        }
    });

    // Validación de categoría
    $('#editarCategoriaProducto').on('change', async function() {
        const campo = $(this);
        await validarCampoTiempoReal(campo, validarCategoria, erroresEditar, 'id_categoria', formulario);
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
    $('#editarProductoModal').on('hidden.bs.modal', function() {
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
    $('#formAgregarProducto button[type="submit"]').prop('disabled', false);
    $('#formEditarProducto button[type="submit"]').prop('disabled', false);
});

// Exportar funciones para uso externo si es necesario
export {
    inicializarValidacionesCrear,
    inicializarValidacionesEditar
};

