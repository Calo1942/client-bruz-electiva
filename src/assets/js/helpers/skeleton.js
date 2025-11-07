/**
 * Módulo Skeleton Loader - Barras de carga esqueletos
 * Proporciona funciones para mostrar estados de carga con skeleton loaders
 */

/**
 * Crea un skeleton loader para una tabla DataTable
 * @param {string|jQuery} tableSelector - Selector de la tabla
 * @param {number} rows - Número de filas skeleton a mostrar
 * @param {number} cols - Número de columnas skeleton a mostrar
 * @returns {jQuery} Elemento skeleton creado
 */
export function createTableSkeleton(tableSelector, rows = 5, cols = 4) {
    const $table = typeof tableSelector === 'string' ? $(tableSelector) : tableSelector;
    const $wrapper = $table.closest('.dataTables_wrapper');
    
    // Crear contenedor skeleton
    const $skeleton = $(`
        <div class="skeleton-loader skeleton-table" style="display: none;">
            <div class="skeleton-header">
                ${Array(cols).fill(0).map(() => '<div class="skeleton-cell skeleton-header-cell"></div>').join('')}
            </div>
            ${Array(rows).fill(0).map(() => `
                <div class="skeleton-row">
                    ${Array(cols).fill(0).map(() => '<div class="skeleton-cell"></div>').join('')}
                </div>
            `).join('')}
        </div>
    `);
    
    // Insertar antes de la tabla
    $wrapper.prepend($skeleton);
    
    return $skeleton;
}

/**
 * Crea un skeleton loader para un formulario
 * @param {string|jQuery} formSelector - Selector del formulario
 * @param {number} fields - Número de campos skeleton a mostrar
 * @returns {jQuery} Elemento skeleton creado
 */
export function createFormSkeleton(formSelector, fields = 4) {
    const $form = typeof formSelector === 'string' ? $(formSelector) : formSelector;
    
    const $skeleton = $(`
        <div class="skeleton-loader skeleton-form" style="display: none;">
            ${Array(fields).fill(0).map(() => `
                <div class="skeleton-form-field">
                    <div class="skeleton-label"></div>
                    <div class="skeleton-input"></div>
                </div>
            `).join('')}
        </div>
    `);
    
    $form.prepend($skeleton);
    
    return $skeleton;
}

/**
 * Crea un skeleton loader genérico
 * @param {string|jQuery} containerSelector - Selector del contenedor
 * @param {string} type - Tipo de skeleton ('card', 'list', 'text')
 * @returns {jQuery} Elemento skeleton creado
 */
export function createSkeleton(containerSelector, type = 'card') {
    const $container = typeof containerSelector === 'string' ? $(containerSelector) : containerSelector;
    
    let skeletonHTML = '';
    
    switch(type) {
        case 'card':
            skeletonHTML = `
                <div class="skeleton-loader skeleton-card">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text short"></div>
                    </div>
                </div>
            `;
            break;
        case 'list':
            skeletonHTML = `
                <div class="skeleton-loader skeleton-list">
                    ${Array(5).fill(0).map(() => `
                        <div class="skeleton-list-item">
                            <div class="skeleton-avatar"></div>
                            <div class="skeleton-list-content">
                                <div class="skeleton-text"></div>
                                <div class="skeleton-text short"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
        case 'text':
            skeletonHTML = `
                <div class="skeleton-loader skeleton-text-container">
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text short"></div>
                </div>
            `;
            break;
        default:
            skeletonHTML = '<div class="skeleton-loader skeleton-generic"></div>';
    }
    
    const $skeleton = $(skeletonHTML);
    $container.append($skeleton);
    
    return $skeleton;
}

/**
 * Muestra el skeleton loader
 * @param {string|jQuery} skeletonSelector - Selector del skeleton
 * @param {string|jQuery} hideSelector - Selector del elemento a ocultar
 */
export function showSkeleton(skeletonSelector, hideSelector = null) {
    const $skeleton = typeof skeletonSelector === 'string' ? $(skeletonSelector) : skeletonSelector;
    
    if (hideSelector) {
        const $hide = typeof hideSelector === 'string' ? $(hideSelector) : hideSelector;
        $hide.hide();
    }
    
    $skeleton.fadeIn(200);
}

/**
 * Oculta el skeleton loader
 * @param {string|jQuery} skeletonSelector - Selector del skeleton
 * @param {string|jQuery} showSelector - Selector del elemento a mostrar
 */
export function hideSkeleton(skeletonSelector, showSelector = null) {
    const $skeleton = typeof skeletonSelector === 'string' ? $(skeletonSelector) : skeletonSelector;
    
    $skeleton.fadeOut(200, function() {
        if (showSelector) {
            const $show = typeof showSelector === 'string' ? $(showSelector) : showSelector;
            $show.fadeIn(200);
        }
    });
}

/**
 * Muestra skeleton durante una operación asíncrona
 * @param {Promise} promise - Promise de la operación
 * @param {string|jQuery} skeletonSelector - Selector del skeleton
 * @param {string|jQuery} contentSelector - Selector del contenido
 * @returns {Promise} Promise original
 */
export async function withSkeleton(promise, skeletonSelector, contentSelector) {
    const $skeleton = typeof skeletonSelector === 'string' ? $(skeletonSelector) : skeletonSelector;
    const $content = typeof contentSelector === 'string' ? $(contentSelector) : contentSelector;
    
    showSkeleton($skeleton, $content);
    
    try {
        const result = await promise;
        hideSkeleton($skeleton, $content);
        return result;
    } catch (error) {
        hideSkeleton($skeleton, $content);
        throw error;
    }
}

/**
 * Crea y muestra skeleton para DataTable durante carga AJAX
 * @param {string|jQuery} tableSelector - Selector de la tabla
 * @param {number} rows - Número de filas
 * @param {number} cols - Número de columnas
 * @returns {jQuery} Elemento skeleton
 */
export function showTableSkeleton(tableSelector, rows = 5, cols = 4) {
    const $table = typeof tableSelector === 'string' ? $(tableSelector) : tableSelector;
    
    // Verificar si ya existe un skeleton
    let $skeleton = $table.siblings('.skeleton-table');
    
    if ($skeleton.length === 0) {
        $skeleton = createTableSkeleton($table, rows, cols);
    }
    
    // Obtener número de columnas de la tabla si no se especifica
    if (!cols) {
        cols = $table.find('thead th').length || 4;
    }
    
    $table.hide();
    showSkeleton($skeleton);
    
    return $skeleton;
}

/**
 * Oculta skeleton de DataTable
 * @param {string|jQuery} tableSelector - Selector de la tabla
 */
export function hideTableSkeleton(tableSelector) {
    const $table = typeof tableSelector === 'string' ? $(tableSelector) : tableSelector;
    const $skeleton = $table.siblings('.skeleton-table');
    
    hideSkeleton($skeleton, $table);
}

