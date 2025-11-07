/**
 * Módulo Image Preview - Renderización y preview de imágenes mejorado
 * Proporciona funciones para manejar preview de imágenes con validación y animaciones
 */

import { pulse } from './animations.js';

/**
 * Configuración por defecto para preview de imágenes
 */
const defaultConfig = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    previewWidth: 200,
    previewHeight: 200,
    showRemoveButton: true,
    animate: true
};

/**
 * Configura preview de imagen para un input file
 * @param {string|jQuery} inputSelector - Selector del input file
 * @param {string|jQuery} previewSelector - Selector del elemento img para preview
 * @param {object} options - Opciones de configuración
 */
export function setupImagePreview(inputSelector, previewSelector, options = {}) {
    const $input = typeof inputSelector === 'string' ? $(inputSelector) : inputSelector;
    const $preview = typeof previewSelector === 'string' ? $(previewSelector) : previewSelector;
    const config = { ...defaultConfig, ...options };
    
    // Asegurar que el preview tenga estilos básicos
    $preview.css({
        'max-width': config.previewWidth + 'px',
        'max-height': config.previewHeight + 'px',
        'border-radius': '8px',
        'object-fit': 'cover',
        'display': 'none',
        'margin-top': '10px',
        'box-shadow': '0 2px 8px rgba(0,0,0,0.1)',
        'transition': 'all 0.3s ease'
    });
    
    $input.on('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Validar tipo de archivo
            if (!config.allowedTypes.includes(file.type)) {
                showImageError($input, 'Tipo de archivo no permitido. Use: JPEG, PNG, GIF o WebP');
                return;
            }
            
            // Validar tamaño
            if (file.size > config.maxSize) {
                showImageError($input, `El archivo es demasiado grande. Tamaño máximo: ${(config.maxSize / 1024 / 1024).toFixed(0)}MB`);
                return;
            }
            
            // Leer y mostrar preview
            const reader = new FileReader();
            
            reader.onload = function(e) {
                if (config.animate) {
                    $preview.css({
                        opacity: 0,
                        transform: 'scale(0.8)'
                    }).attr('src', e.target.result).show().animate({
                        opacity: 1
                    }, {
                        duration: 300,
                        step: function(now) {
                            const scale = 0.8 + (0.2 * now);
                            $(this).css('transform', `scale(${scale})`);
                        },
                        complete: function() {
                            $(this).css('transform', 'scale(1)');
                        }
                    });
                } else {
                    $preview.attr('src', e.target.result).fadeIn(300);
                }
                
                // Agregar botón de eliminar si está habilitado
                if (config.showRemoveButton) {
                    addRemoveButton($preview, $input, config);
                }
                
                // Limpiar errores previos
                clearImageError($input);
            };
            
            reader.onerror = function() {
                showImageError($input, 'Error al leer el archivo');
            };
            
            reader.readAsDataURL(file);
        } else {
            clearPreview($preview, $input, config);
        }
    });
}

/**
 * Muestra una imagen existente en el preview
 * @param {string|jQuery} previewSelector - Selector del preview
 * @param {string} imageUrl - URL de la imagen
 * @param {boolean} animate - Si debe animarse
 */
export function showExistingImage(previewSelector, imageUrl, animate = true) {
    const $preview = typeof previewSelector === 'string' ? $(previewSelector) : previewSelector;
    
    if (imageUrl) {
        if (animate) {
            $preview.css({
                opacity: 0
            }).attr('src', imageUrl).fadeIn(300);
        } else {
            $preview.attr('src', imageUrl).show();
        }
    } else {
        $preview.hide();
    }
}

/**
 * Limpia el preview de imagen
 * @param {string|jQuery} previewSelector - Selector del preview
 * @param {string|jQuery} inputSelector - Selector del input
 * @param {object} config - Configuración
 */
export function clearPreview(previewSelector, inputSelector = null, config = {}) {
    const $preview = typeof previewSelector === 'string' ? $(previewSelector) : previewSelector;
    const $input = inputSelector ? (typeof inputSelector === 'string' ? $(inputSelector) : inputSelector) : null;
    
    $preview.fadeOut(200, function() {
        $(this).attr('src', '').hide();
    });
    
    if ($input) {
        $input.val('');
    }
    
    // Remover botón de eliminar si existe
    $preview.siblings('.btn-remove-image').remove();
}

/**
 * Agrega botón para eliminar imagen
 * @param {jQuery} $preview - Elemento preview
 * @param {jQuery} $input - Elemento input
 * @param {object} config - Configuración
 */
function addRemoveButton($preview, $input, config) {
    // Remover botón anterior si existe
    $preview.siblings('.btn-remove-image').remove();
    
    const $removeBtn = $(`
        <button type="button" class="btn btn-sm btn-danger btn-remove-image" 
                style="position: absolute; margin-top: 10px; border-radius: 50%; width: 30px; height: 30px; padding: 0;">
            <i class="bi bi-x"></i>
        </button>
    `);
    
    $preview.parent().css('position', 'relative').append($removeBtn);
    
    $removeBtn.on('click', function(e) {
        e.preventDefault();
        clearPreview($preview, $input, config);
    });
}

/**
 * Muestra error de imagen
 * @param {string|jQuery} inputSelector - Selector del input
 * @param {string} message - Mensaje de error
 */
function showImageError(inputSelector, message) {
    const $input = typeof inputSelector === 'string' ? $(inputSelector) : inputSelector;
    
    // Remover error anterior
    clearImageError($input);
    
    // Agregar mensaje de error
    const $error = $(`
        <div class="text-danger small mt-1 image-error-message">
            <i class="bi bi-exclamation-circle"></i> ${message}
        </div>
    `);
    
    $input.after($error);
    pulse($input);
    $input.addClass('is-invalid');
}

/**
 * Limpia error de imagen
 * @param {string|jQuery} inputSelector - Selector del input
 */
function clearImageError(inputSelector) {
    const $input = typeof inputSelector === 'string' ? $(inputSelector) : inputSelector;
    $input.siblings('.image-error-message').remove();
    $input.removeClass('is-invalid');
}

/**
 * Valida una imagen antes de subirla
 * @param {File} file - Archivo a validar
 * @param {object} options - Opciones de validación
 * @returns {object} { valid: boolean, error: string }
 */
export function validateImage(file, options = {}) {
    const config = { ...defaultConfig, ...options };
    
    if (!file) {
        return { valid: false, error: 'No se seleccionó ningún archivo' };
    }
    
    if (!config.allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Tipo de archivo no permitido' };
    }
    
    if (file.size > config.maxSize) {
        return { valid: false, error: `El archivo es demasiado grande. Máximo: ${(config.maxSize / 1024 / 1024).toFixed(0)}MB` };
    }
    
    return { valid: true, error: null };
}

/**
 * Crea un preview de imagen con zoom al hacer hover
 * @param {string|jQuery} previewSelector - Selector del preview
 */
export function enableImageZoom(previewSelector) {
    const $preview = typeof previewSelector === 'string' ? $(previewSelector) : previewSelector;
    
    $preview.css({
        cursor: 'zoom-in',
        transition: 'transform 0.3s ease'
    });
    
    $preview.on('mouseenter', function() {
        $(this).css('transform', 'scale(1.1)');
    });
    
    $preview.on('mouseleave', function() {
        $(this).css('transform', 'scale(1)');
    });
}

