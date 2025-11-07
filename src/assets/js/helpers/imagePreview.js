import { pulse } from './animations.js';

const defaultConfig = {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    previewWidth: 200,
    previewHeight: 200,
    showRemoveButton: true,
    animate: true
};

// CONFIGURACIÓN PRINCIPAL
export function setupImagePreview(inputSelector, previewSelector, options = {}) {
    const $input = $(inputSelector);
    const $preview = $(previewSelector);
    const config = { ...defaultConfig, ...options };

    $preview.css({
        maxWidth: `${config.previewWidth}px`,
        maxHeight: `${config.previewHeight}px`,
        borderRadius: '8px',
        objectFit: 'cover',
        marginTop: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
    }).hide();

    // Evento de selección de imagen
    $input.off('change.imagePreview').on('change.imagePreview', (e) => {
        const file = e.target.files[0];
        if (!file) return clearPreview($preview, $input, config);

        // Validaciones
        if (!config.allowedTypes.includes(file.type))
            return showImageError($input, 'Tipo de archivo no permitido. Use: JPEG, PNG, GIF o WebP');

        if (file.size > config.maxSize)
            return showImageError($input, `El archivo es demasiado grande. Máximo ${(config.maxSize / 1024 / 1024).toFixed(0)}MB`);

        // Leer archivo
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            $preview.attr('src', imageUrl);
            clearImageError($input);

            if (config.animate) {
                // Animación de aparición
                $preview
                    .css({ opacity: 0, transform: 'scale(0.85)', display: 'block', visibility: 'visible' })
                    .animate({ opacity: 1 }, {
                        duration: 300,
                        step(now) {
                            const scale = 0.85 + (0.15 * now);
                            $(this).css('transform', `scale(${scale})`);
                        },
                        complete() {
                            $(this).css({ transform: 'scale(1)' });
                        }
                    });
            } else {
                $preview.fadeIn(300);
            }

            // Botón de eliminar
            if (config.showRemoveButton) addRemoveButton($preview, $input, config);
        };

        reader.onerror = () => showImageError($input, 'Error al leer el archivo');
        reader.readAsDataURL(file);
    });
}

// MOSTRAR IMAGEN EXISTENTE
export function showExistingImage(previewSelector, imageUrl, animate = true) {
    const $preview = $(previewSelector);

    if (imageUrl) {
        $preview.attr('src', imageUrl);
        animate ? $preview.css({ opacity: 0, display: 'block' }).fadeIn(300) : $preview.show();
    } else {
        $preview.hide();
    }
}

// LIMPIAR PREVIEW
export function clearPreview(previewSelector, inputSelector = null) {
    const $preview = $(previewSelector);
    const $input = inputSelector ? $(inputSelector) : null;

    $preview.fadeOut(200, function() {
        $(this).attr('src', '').hide();
    });

    if ($input) $input.val('');
    $preview.siblings('.btn-remove-image').remove();
}


// AGREGAR BOTÓN DE ELIMINAR
function addRemoveButton($preview, $input) {
    $preview.siblings('.btn-remove-image').remove();

    const $removeBtn = $(`
        <button type="button" class="btn-remove-image" title="Eliminar imagen">
            <i class="bi bi-x"></i>
        </button>
    `);

    $preview.parent().css('position', 'relative').append($removeBtn);

    $removeBtn.on('click', (e) => {
        e.preventDefault();
        clearPreview($preview, $input);
    });
}

//MOSTRAR ERROR
function showImageError($input, message) {
    clearImageError($input);
    $input.after(`
        <div class="text-danger small mt-1 image-error-message">
            <i class="bi bi-exclamation-circle"></i> ${message}
        </div>
    `);
    pulse($input);
    $input.addClass('is-invalid');
}

// LIMPIAR ERROR
function clearImageError($input) {
    $input.siblings('.image-error-message').remove();
    $input.removeClass('is-invalid');
}

// VALIDAR ARCHIVO (sin mostrar mensajes)
export function validateImage(file, options = {}) {
    const config = { ...defaultConfig, ...options };
    if (!file) return { valid: false, error: 'No se seleccionó ningún archivo' };
    if (!config.allowedTypes.includes(file.type)) return { valid: false, error: 'Tipo de archivo no permitido' };
    if (file.size > config.maxSize) return { valid: false, error: `El archivo es demasiado grande. Máximo ${(config.maxSize / 1024 / 1024).toFixed(0)}MB` };
    return { valid: true, error: null };
}

// ZOOM AL PASAR EL MOUSE
export function enableImageZoom(previewSelector) {
    const $preview = $(previewSelector);
    $preview.css({ cursor: 'zoom-in', transition: 'transform 0.3s ease' })
        .on('mouseenter', function() { $(this).css('transform', 'scale(1.1)'); })
        .on('mouseleave', function() { $(this).css('transform', 'scale(1)'); });
}
