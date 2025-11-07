/**
 * Módulo de Accesibilidad - Correcciones de accesibilidad para modales y elementos interactivos
 * Soluciona problemas de aria-hidden y accesibilidad
 */

/**
 * Corrige el problema de aria-hidden en contenedores cuando se abren modales
 * Bootstrap agrega aria-hidden al contenedor principal, pero esto causa problemas
 * si hay elementos con foco dentro
 */
export function fixAriaHiddenIssue() {
    // Cuando se muestra un modal, remover aria-hidden del contenedor principal
    $(document).on('show.bs.modal', '.modal', function() {
        // Buscar el contenedor principal que Bootstrap podría ocultar
        const $mainContainer = $('.flex-grow-1.d-flex.flex-column');
        
        // Remover aria-hidden si existe
        $mainContainer.removeAttr('aria-hidden');
        
        // En su lugar, usar inert si está disponible (mejor para accesibilidad)
        // Pero como inert no tiene soporte universal, usaremos una solución alternativa
        // Agregar una clase para deshabilitar interacción con el contenido de fondo
        $mainContainer.addClass('modal-backdrop-active');
    });
    
    // Cuando se oculta un modal, restaurar el estado
    $(document).on('hidden.bs.modal', '.modal', function() {
        const $mainContainer = $('.flex-grow-1.d-flex.flex-column');
        $mainContainer.removeClass('modal-backdrop-active');
    });
}

/**
 * Inicializa todas las correcciones de accesibilidad
 */
export function initAccessibility() {
    fixAriaHiddenIssue();
}

