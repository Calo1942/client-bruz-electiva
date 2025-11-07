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


export function shake(selector, duration = 500) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    
    $element.css('animation', 'none');
    setTimeout(() => {
        $element.css('animation', `shake ${duration}ms ease-in-out`);
    }, 10);
}


export function pulse(selector, iterations = 2) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    
    $element.css('animation', 'none');
    setTimeout(() => {
        $element.css('animation', `pulse 0.6s ease-in-out ${iterations}`);
    }, 10);
}


export function fadeIn(selector, duration = 300) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    $element.hide().fadeIn(duration);
}


export function fadeOut(selector, duration = 300, callback = null) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    $element.fadeOut(duration, callback);
}


export function slideDown(selector, duration = 300) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    $element.slideDown(duration);
}


export function slideUp(selector, duration = 300, callback = null) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    $element.slideUp(duration, callback);
}


export function staggerIn(selector, staggerDelay = 100, duration = 400) {
    const $elements = typeof selector === 'string' ? $(selector) : selector;
    
    $elements.each(function(index) {
        animateIn($(this), duration, index * staggerDelay);
    });
}

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
            duration: 100,
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


export function initAllAnimations() {
    initModalAnimations();
}

// CORREGIR PROBLEMAS DE ACCESIBILIDAD EN MODALES
export function fixModalAriaHidden() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
                const $target = $(mutation.target);
                
                if ($target.hasClass('flex-grow-1') && $target.hasClass('d-flex') && $target.hasClass('flex-column')) {
                    const $visibleModal = $('.modal.show, .modal.in');
                    if ($visibleModal.length > 0) {
                        $target.removeAttr('aria-hidden');
                    }
                }
                
                // Si un elemento con foco está dentro de un aria-hidden, removerlo
                const $focusedElement = $(document.activeElement);
                if ($focusedElement.length && $focusedElement.closest('[aria-hidden="true"]').length) {
                    $focusedElement.closest('[aria-hidden="true"]').removeAttr('aria-hidden');
                }
            }
        });
    });
    
    // Observar cambios en el body y contenedores principales
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['aria-hidden'],
        subtree: true
    });
    
   
    $(document).on('show.bs.modal', '.modal', function(e) {
        
        const $mainContainer = $('.flex-grow-1.d-flex.flex-column');
        $mainContainer.removeAttr('aria-hidden');
    });
    
    $(document).on('shown.bs.modal', '.modal', function() {
        
        const $mainContainer = $('.flex-grow-1.d-flex.flex-column');
        $mainContainer.removeAttr('aria-hidden');
        
        setTimeout(() => {
            const $focusedElement = $(document.activeElement);
            if ($focusedElement.length) {
                const $hiddenParent = $focusedElement.closest('[aria-hidden="true"]');
                if ($hiddenParent.length && !$hiddenParent.hasClass('modal')) {
                    $hiddenParent.removeAttr('aria-hidden');
                }
            }
        }, 50);
    });
    
    $(document).on('hide.bs.modal', '.modal', function() {
       
        setTimeout(() => {
            const $visibleModals = $('.modal.show, .modal.in');
            if ($visibleModals.length === 0) {
                
                return;
            }
            $('.flex-grow-1.d-flex.flex-column').removeAttr('aria-hidden');
        }, 100);
    });
}

