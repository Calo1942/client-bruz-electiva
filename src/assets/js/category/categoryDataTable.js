$(document).ready(async function() {
    const tblCategory = $('#categoryTable').DataTable({
        ajax: {
            url: '',
            method: 'POST',
            data: {
                getAll: true
            },
            dataSrc: 'data'
        },
        columns: [
            {data: 'id_categoria'},    
            {data: 'nombre'},
            {data: null, render: (data)=>{
                const btnVer = `<button value="${data.id_categoria}" type="button" class="btn btn-sm btn-primary me-1 btn-ver" title="Ver categoría">
                    <i class="bi bi-eye"></i>
                </button>`;
                const btnEditar = `<button value="${data.id_categoria}" type="button" class="btn btn-sm btn-secondary me-1 btn-editar" title="Editar categoría">
                    <i class="bi bi-pencil-square"></i>
                </button>`;
                const btnEliminar = `<button value="${data.id_categoria}" type="button" class="btn btn-sm btn-danger btn-eliminar" title="Eliminar categoría">
                    <i class="bi bi-trash"></i>
                </button>`;

                return `${btnVer} ${btnEditar} ${btnEliminar}`;
            }}
        ],
        autoWidth: false,
        "columnDefs": [
            {targets: [0, 1], className: 'tabla'},
            { orderable: false, className: 'acciones', targets: [2] }
        ],
        "language":{
            url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json",
            search: "", 
            searchPlaceholder: "Buscar..." 
        },
        "dom": '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
               '<"row"<"col-sm-12"tr>>' +
               '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
        "initComplete": function() {
            
            $('.dataTables_filter input').attr('placeholder', 'Buscar...');
        }
    });

    $(document).on('click', '.btn-agregar', async function() {
        
        $('#nombreCategoria').val('');
       
        $('#formAgregarCategoria .is-valid, #formAgregarCategoria .is-invalid').removeClass('is-valid is-invalid');
        
        $('#agregarCategoriaModal').modal('show');
    }); 

    $(document).on('click', '.btn-ver', async function() {
        const id = this.value;
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: {
                show: id
            },
            success: function(response) {
                if (response.success) {
                    $('#verCategoriaId').text(response.data.id_categoria);
                    $('#verNombreCategoria').text(response.data.nombre);
                    
                    $('#verCategoriaModal').modal('show');
                } else {
                    alert('Error al cargar los datos de la categoría');
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });

    $(document).on('submit', '#formAgregarCategoria', async function(e) {
        e.preventDefault();
        
        const formData = {
            nombre: $('#nombreCategoria').val(),
            store: true
        };
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: formData,
            success: function(response) {
                if (response.success) {
                    alert('Categoría agregada correctamente');
                    $('#agregarCategoriaModal').modal('hide');
                    tblCategory.ajax.reload();
                } else {
                    alert('Error al agregar la categoría: ' + response.message);
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });

    $(document).on('click', '.btn-editar', async function() {
        const id = this.value;
        
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: {
                show: id
            },
            success: function(response) {
                if (response.success) {
                    $('#editarCategoriaId').val(response.data.id_categoria);
                    $('#editarNombreCategoria').val(response.data.nombre);
                    
                    $('#formEditarCategoria .is-valid, #formEditarCategoria .is-invalid').removeClass('is-valid is-invalid');
                    
                    $('#editarCategoriaModal').modal('show');
                } else {
                    alert('Error al cargar los datos de la categoría');
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });

    $(document).on('submit', '#formEditarCategoria', async function(e) {
        e.preventDefault();
        
        const formData = {
            id_categoria: $('#editarCategoriaId').val(),
            nombre: $('#editarNombreCategoria').val(),
            update: true
        };
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: formData,
            success: function(response) {
                if (response.success) {
                    alert('Categoría actualizada correctamente');
                    $('#editarCategoriaModal').modal('hide');
                    tblCategory.ajax.reload();
                } else {
                    alert('Error al actualizar la categoría: ' + response.message);
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });
    
    $(document).on('click', '.btn-eliminar', async function() {
        const id = this.value;
        
        if (confirm('¿Está seguro de eliminar esta categoría?')) {
            $.ajax({
                url: '',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    delete: id
                },
                success: function(response) {
                    if (response.success) {
                        alert('Categoría eliminada correctamente');
                        tblCategory.ajax.reload();
                    } else {
                        alert('Error al eliminar la categoría: ' + response.message);
                    }
                },
                error: function() {
                    alert('Error de conexión');
                }
            });
        }
    });

   
    $('#agregarCategoriaModal').on('hidden.bs.modal', function() {
        setTimeout(() => {
            tblCategory.ajax.reload();
        }, 500);
    });

});

