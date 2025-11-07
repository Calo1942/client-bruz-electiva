/**
 * Módulo de Animaciones - Animaciones para elementos de entrada y transiciones
 * Proporciona funciones para animar elementos del DOM de forma consistente
 */

/**
 * Aplica animación de entrada (fade in + slide up) a un elemento
 * @param {string|jQuery} selector - Selector del elemento
 * @param {number} duration - Duración de la animación en ms
 * @param {number} delay - Delay antes de iniciar la animación en ms
 */
export function animateIn(selector, duration = 400, delay = 0) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    
    setTimeout(() => {
        $element.css({
            opacity: 0,
            transform: 'translateY(20px)'
        }).show().animate({
            opacity: 1
        }, {
            duration: duration,
            step: function(now) {
                const progress = now;
                const translateY = 20 * (1 - progress);
                $(this).css('transform', `translateY(${translateY}px)`);
            },
            complete: function() {
                $(this).css('transform', 'translateY(0)');
            }
        });
    }, delay);
}

/**
 * Aplica animación de salida (fade out + slide down) a un elemento
 * @param {string|jQuery} selector - Selector del elemento
 * @param {number} duration - Duración de la animación en ms
 * @param {function} callback - Función a ejecutar al completar
 */
export function animateOut(selector, duration = 300, callback = null) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    
    $element.animate({
        opacity: 0
    }, {
        duration: duration,
        step: function(now) {
            const progress = 1 - now;
            const translateY = 20 * (1 - progress);
            $(this).css('transform', `translateY(${translateY}px)`);
        },
        complete: function() {
            $(this).hide().css({
                opacity: 1,
                transform: 'translateY(0)'
            });
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    });
}

/**
 * Aplica animación de shake (temblor) a un elemento (útil para errores)
 * @param {string|jQuery} selector - Selector del elemento
 * @param {number} duration - Duración de la animación en ms
 */
export function shake(selector, duration = 500) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    
    $element.css('animation', 'none');
    setTimeout(() => {
        $element.css('animation', `shake ${duration}ms ease-in-out`);
    }, 10);
}

/**
 * Aplica animación de pulse (pulso) a un elemento
 * @param {string|jQuery} selector - Selector del elemento
 * @param {number} iterations - Número de pulsos
 */
export function pulse(selector, iterations = 2) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    
    $element.css('animation', 'none');
    setTimeout(() => {
        $element.css('animation', `pulse 0.6s ease-in-out ${iterations}`);
    }, 10);
}

/**
 * Aplica animación de fade in a un elemento
 * @param {string|jQuery} selector - Selector del elemento
 * @param {number} duration - Duración de la animación en ms
 */
export function fadeIn(selector, duration = 300) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    $element.hide().fadeIn(duration);
}

/**
 * Aplica animación de fade out a un elemento
 * @param {string|jQuery} selector - Selector del elemento
 * @param {number} duration - Duración de la animación en ms
 * @param {function} callback - Función a ejecutar al completar
 */
export function fadeOut(selector, duration = 300, callback = null) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    $element.fadeOut(duration, callback);
}

/**
 * Aplica animación de slide down a un elemento
 * @param {string|jQuery} selector - Selector del elemento
 * @param {number} duration - Duración de la animación en ms
 */
export function slideDown(selector, duration = 300) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    $element.slideDown(duration);
}

/**
 * Aplica animación de slide up a un elemento
 * @param {string|jQuery} selector - Selector del elemento
 * @param {number} duration - Duración de la animación en ms
 * @param {function} callback - Función a ejecutar al completar
 */
export function slideUp(selector, duration = 300, callback = null) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    $element.slideUp(duration, callback);
}

/**
 * Aplica animación de entrada escalonada a múltiples elementos
 * @param {string|jQuery} selector - Selector de los elementos
 * @param {number} staggerDelay - Delay entre cada elemento en ms
 * @param {number} duration - Duración de la animación en ms
 */
export function staggerIn(selector, staggerDelay = 100, duration = 400) {
    const $elements = typeof selector === 'string' ? $(selector) : selector;
    
    $elements.each(function(index) {
        animateIn($(this), duration, index * staggerDelay);
    });
}

/**
 * Inicializa animaciones para modales de Bootstrap
 */
export function initModalAnimations() {
    // Animación al abrir modal
    $(document).on('show.bs.modal', '.modal', function() {
        const $modal = $(this);
        $modal.find('.modal-content').css({
            opacity: 0,
            transform: 'scale(0.8) translateY(-50px)'
        });
    });

    $(document).on('shown.bs.modal', '.modal', function() {
        const $modal = $(this);
        $modal.find('.modal-content').animate({
            opacity: 1
        }, {
            duration: 300,
            step: function(now) {
                const progress = now;
                const scale = 0.8 + (0.2 * progress);
                const translateY = -50 * (1 - progress);
                $(this).css({
                    transform: `scale(${scale}) translateY(${translateY}px)`
                });
            },
            complete: function() {
                $(this).css('transform', 'scale(1) translateY(0)');
            }
        });
    });

    // Animación al cerrar modal
    $(document).on('hide.bs.modal', '.modal', function() {
        const $modal = $(this);
        $modal.find('.modal-content').animate({
            opacity: 0
        }, {
            duration: 200,
            step: function(now) {
                const progress = 1 - now;
                const scale = 1 - (0.2 * progress);
                const translateY = 50 * progress;
                $(this).css({
                    transform: `scale(${scale}) translateY(${translateY}px)`
                });
            }
        });
    });
}

/**
 * Inicializa animaciones para elementos de formulario
 */
export function initFormAnimations() {
    // Animación al enfocar campos de formulario
    $(document).on('focus', '.form-control, .form-select', function() {
        const $field = $(this);
        $field.parent().addClass('field-focused');
    });

    $(document).on('blur', '.form-control, .form-select', function() {
        const $field = $(this);
        $field.parent().removeClass('field-focused');
    });

    // Animación para campos con validación
    $(document).on('input', '.form-control, .form-select', function() {
        const $field = $(this);
        if ($field.hasClass('is-valid') || $field.hasClass('is-invalid')) {
            pulse($field, 1);
        }
    });
}

/**
 * Inicializa todas las animaciones del sistema
 */
export function initAllAnimations() {
    initModalAnimations();
    initFormAnimations();
}

