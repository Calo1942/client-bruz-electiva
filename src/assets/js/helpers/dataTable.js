// dataTable.js
const defaultConfig = {
    autoWidth: false,
    language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json",
        searchPlaceholder: "Buscar..."
    },
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>><"row"<"col-sm-12"tr>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>'
};

export const createActionsColumn = (options = {}) => ({
    data: null,
    render: (data, type, row) => {
        const id = row.id || row.id_producto || row.id_categoria || row.cedula;
        const buttons = [];
        
        if (options.btnVer !== false) {
            buttons.push(`<button value="${id}" class="btn btn-sm btn-primary me-1 btn-ver" title="Ver"><i class="bi bi-eye"></i></button>`);
        }
        
        if (options.btnEditar !== false) {
            buttons.push(`<button value="${id}" class="btn btn-sm btn-secondary me-1 btn-editar" title="Editar"><i class="bi bi-pencil-square"></i></button>`);
        }
        
        if (options.btnEliminar !== false) {
            buttons.push(`<button value="${id}" class="btn btn-sm btn-danger btn-eliminar" title="Eliminar"><i class="bi bi-trash"></i></button>`);
        }

        return buttons.join(' ');
    },
    orderable: false,
    className: 'acciones'
});

export const createDataTable = (tableId, url, columns, customConfig = {}) => {
    const config = {
        ...defaultConfig,
        ajax: { url, method: 'POST', data: { getAll: true }, dataSrc: 'data' },
        columns,
        ...customConfig
    };

    return $(tableId).DataTable(config);
};

export const reloadDataTable = (dataTable) => dataTable.ajax.reload();