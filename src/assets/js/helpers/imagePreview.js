// imagePreview.js
import { pulse } from './animations.js';

const defaultConfig = {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    previewWidth: 200,
    previewHeight: 200
};

const showImageError = ($input, message) => {
    $input.after(`<div class="text-danger small mt-1">${message}</div>`);
    pulse($input);
    $input.addClass('is-invalid');
};

export const setupImagePreview = (inputSelector, previewSelector, options = {}) => {
    const $input = $(inputSelector);
    const $preview = $(previewSelector);
    const config = { ...defaultConfig, ...options };

    $preview.css({
        maxWidth: `${config.previewWidth}px`,
        maxHeight: `${config.previewHeight}px`,
        borderRadius: '8px',
        objectFit: 'cover',
        marginTop: '10px'
    }).hide();

    $input.on('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!config.allowedTypes.includes(file.type)) {
            showImageError($input, 'Tipo de archivo no permitido');
            return;
        }

        if (file.size > config.maxSize) {
            showImageError($input, `El archivo es demasiado grande. Máximo ${config.maxSize / 1024 / 1024}MB`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            $preview.attr('src', event.target.result).fadeIn(300);
            $input.removeClass('is-invalid');
        };
        reader.readAsDataURL(file);
    });
};

export const clearPreview = (previewSelector, inputSelector = null) => {
    $(previewSelector).hide().attr('src', '');
    if (inputSelector) $(inputSelector).val('');
};