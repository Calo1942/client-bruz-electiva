
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

    if (!url || url === '') {
        config.ajax.url = window.location.href;
    }

    return $(tableId).DataTable(config);
}


export function reloadDataTable(dataTable, delay = 0) {
    if (delay > 0) {
        setTimeout(() => {
            dataTable.ajax.reload();
        }, delay);
    } else {
        dataTable.ajax.reload();
    }
}


export function clearFormValidation(formSelector) {
    const $form = typeof formSelector === 'string' ? $(formSelector) : formSelector;
    $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
}


export function clearFormFields(formSelector, fields = []) {
    const $form = typeof formSelector === 'string' ? $(formSelector) : formSelector;
    fields.forEach(fieldId => {
        const selector = fieldId.startsWith('#') ? fieldId : `#${fieldId}`;
        $form.find(selector).val('');
    });
}


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

