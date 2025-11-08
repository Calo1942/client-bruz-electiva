/**
 * Corrige el problema de aria-hidden en el contenedor principal cuando se abren modales
 */
export function initAccessibility() {
    const $mainContainer = $('.flex-grow-1.d-flex.flex-column');
    
    $(document).on('show.bs.modal', '.modal', function() {
        $mainContainer.removeAttr('aria-hidden');
        $mainContainer.addClass('modal-backdrop-active');
    });
    
    $(document).on('hidden.bs.modal', '.modal', function() {
        $mainContainer.removeClass('modal-backdrop-active');
    });
}

