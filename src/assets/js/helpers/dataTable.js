/**
 * Módulo DataTable - Configuración base para DataTables con AJAX
 * Proporciona funciones para crear y configurar DataTables de forma consistente
 */

/**
 * Configuración por defecto para DataTables
 */
const defaultConfig = {
    autoWidth: false,
    language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json",
        search: "",
        searchPlaceholder: "Buscar..."
    },
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
         '<"row"<"col-sm-12"tr>>' +
         '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
    initComplete: function() {
        $('.dataTables_filter input').attr('placeholder', 'Buscar...');
    }
};

/**
 * Crea una configuración de columna de acciones estándar
 * @param {function} renderFunction - Función personalizada para renderizar los botones
 * @param {object} options - Opciones adicionales (btnVer, btnEditar, btnEliminar)
 * @returns {object} Configuración de columna
 */
export function createActionsColumn(renderFunction = null, options = {}) {
    const defaultRender = (data, type, row) => {
        // Usar el campo ID especificado o intentar detectarlo automáticamente
        let id = null;
        if (options.idField) {
            id = row[options.idField];
        } else {
            // Intentar detectar el ID común (id_producto, id_categoria, cedula, etc.)
            id = row.id_producto || row.id_categoria || row.cedula || row.id || '';
        }
        
        const btnVer = options.btnVer !== false ? 
            `<button value="${id}" type="button" class="btn btn-sm btn-primary me-1 btn-ver" title="${options.verTitle || 'Ver'}">
                <i class="bi bi-eye"></i>
            </button>` : '';
        
        const btnEditar = options.btnEditar !== false ? 
            `<button value="${id}" type="button" class="btn btn-sm btn-secondary me-1 btn-editar" title="${options.editarTitle || 'Editar'}">
                <i class="bi bi-pencil-square"></i>
            </button>` : '';
        
        const btnEliminar = options.btnEliminar !== false ? 
            `<button value="${id}" type="button" class="btn btn-sm btn-danger btn-eliminar" title="${options.eliminarTitle || 'Eliminar'}">
                <i class="bi bi-trash"></i>
            </button>` : '';

        return `${btnVer} ${btnEditar} ${btnEliminar}`.trim();
    };

    return {
        data: null,
        render: renderFunction || defaultRender,
        orderable: false,
        className: 'acciones'
    };
}

/**
 * Crea una configuración de DataTable con AJAX
 * @param {string} tableId - ID del elemento table
 * @param {string} url - URL del endpoint para AJAX
 * @param {array} columns - Array de configuraciones de columnas
 * @param {object} customConfig - Configuración personalizada adicional
 * @returns {object} Instancia de DataTable
 */
export function createDataTable(tableId, url, columns, customConfig = {}) {
    const ajaxConfig = {
        url: url,
        method: 'POST',
        data: {
            getAll: true
        },
        dataSrc: 'data'
    };

    // Determinar columnas de acciones para aplicar className
    const actionColumnIndex = columns.findIndex(col => col.className === 'acciones' || (col.data === null && !col.orderable));
    const columnDefs = [
        ...(customConfig.columnDefs || []),
        { targets: actionColumnIndex >= 0 ? [actionColumnIndex] : [], orderable: false, className: 'acciones' }
    ];

    // Aplicar className 'tabla' a todas las columnas excepto acciones
    const dataColumns = columns.map((col, index) => {
        if (index !== actionColumnIndex && !col.className) {
            return { ...col, className: 'tabla' };
        }
        return col;
    });

    // Construir targets para className 'tabla'
    const tablaTargets = [];
    columns.forEach((col, index) => {
        if (index !== actionColumnIndex) {
            tablaTargets.push(index);
        }
    });

    if (tablaTargets.length > 0) {
        columnDefs.push({ targets: tablaTargets, className: 'tabla' });
    }

    const config = {
        ...defaultConfig,
        ajax: ajaxConfig,
        columns: dataColumns,
        columnDefs: columnDefs,
        ...customConfig
    };

    // Si la URL está vacía, usar la URL actual
    if (!url || url === '') {
        config.ajax.url = window.location.href;
    }

    return $(tableId).DataTable(config);
}

/**
 * Recarga una DataTable
 * @param {object} dataTable - Instancia de DataTable
 * @param {number} delay - Delay en milisegundos antes de recargar
 */
export function reloadDataTable(dataTable, delay = 0) {
    if (delay > 0) {
        setTimeout(() => {
            dataTable.ajax.reload();
        }, delay);
    } else {
        dataTable.ajax.reload();
    }
}

/**
 * Limpia las clases de validación de un formulario
 * @param {string|jQuery} formSelector - Selector del formulario
 */
export function clearFormValidation(formSelector) {
    const $form = typeof formSelector === 'string' ? $(formSelector) : formSelector;
    $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
}

/**
 * Limpia los campos de un formulario
 * @param {string|jQuery} formSelector - Selector del formulario
 * @param {array} fields - Array de IDs de campos a limpiar (sin el #)
 */
export function clearFormFields(formSelector, fields = []) {
    const $form = typeof formSelector === 'string' ? $(formSelector) : formSelector;
    fields.forEach(fieldId => {
        // Si el fieldId ya incluye #, usarlo directamente, si no, agregarlo
        const selector = fieldId.startsWith('#') ? fieldId : `#${fieldId}`;
        $form.find(selector).val('');
    });
}

/**
 * Previsualiza una imagen desde un input file
 * @param {string|jQuery} inputSelector - Selector del input file
 * @param {string|jQuery} previewSelector - Selector del elemento img para preview
 */
export function setupImagePreview(inputSelector, previewSelector) {
    const $input = typeof inputSelector === 'string' ? $(inputSelector) : inputSelector;
    const $preview = typeof previewSelector === 'string' ? $(previewSelector) : previewSelector;

    $input.on('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $preview.attr('src', e.target.result).show();
            };
            reader.readAsDataURL(file);
        } else {
            $preview.hide().attr('src', '');
        }
    });
}

