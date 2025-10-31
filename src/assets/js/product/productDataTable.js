$(document).ready(async function() {
    const tblProduct = $('#productTable').DataTable({
        ajax: {
            url: '',
            method: 'POST',
            data: {
                getAll: true
            },
            dataSrc: 'data'
        },
        columns: [
            {data: 'id_producto'},    
            {data: 'nombre'},
            {data: 'imagen', render: function(data) {
                if (data) {
                    return `<img src="${data}" alt="Imagen producto" style="max-width: 50px; max-height: 50px; border-radius: 4px; object-fit: cover;">`;
                }
                return '<span class="text-muted">Sin imagen</span>';
            }},
            {data: 'id_categoria', render: function(data) {
                return data || 'Sin categoría';
            }},
            {data: 'precio_detal', render: function(data) {
                return '$' + parseFloat(data || 0).toFixed(2);
            }},
            {data: 'precio_mayor', render: function(data) {
                return data ? '$' + parseFloat(data).toFixed(2) : 'N/A';
            }},
            {data: null, render: (data)=>{
                const btnVer = `<button value="${data.id_producto}" type="button" class="btn btn-sm btn-primary me-1 btn-ver" title="Ver producto">
                    <i class="bi bi-eye"></i>
                </button>`;
                const btnEditar = `<button value="${data.id_producto}" type="button" class="btn btn-sm btn-secondary me-1 btn-editar" title="Editar producto">
                    <i class="bi bi-pencil-square"></i>
                </button>`;
                const btnEliminar = `<button value="${data.id_producto}" type="button" class="btn btn-sm btn-danger btn-eliminar" title="Eliminar producto">
                    <i class="bi bi-trash"></i>
                </button>`;

                return `${btnVer} ${btnEditar} ${btnEliminar}`;
            }}
        ],
        autoWidth: false,
        "columnDefs": [
            {targets: [0, 1, 2, 3, 4, 5], className: 'tabla'},
            { orderable: false, className: 'acciones', targets: [6] }
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
        
        $('#nombreProducto').val('');
        $('#categoriaProducto').val('');
        $('#descripcionProducto').val('');
        $('#detalProducto').val('');
        $('#mayorProducto').val('');
        $('#imagenProducto').val('');
        $('#previewImagenProducto').hide().attr('src', '');
       
        $('#formAgregarProducto .is-valid, #formAgregarProducto .is-invalid').removeClass('is-valid is-invalid');
        
        $('#agregarProductoModal').modal('show');
    });

    // Previsualización de imagen al seleccionar
    $(document).on('change', '#imagenProducto', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('#previewImagenProducto').attr('src', e.target.result).show();
            };
            reader.readAsDataURL(file);
        } else {
            $('#previewImagenProducto').hide().attr('src', '');
        }
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
                    $('#verNombreProducto').text(response.data.nombre || '');
                    $('#verCategoriaProducto').text(response.data.id_categoria || 'Sin categoría');
                    $('#verDescripcionProducto').text(response.data.descripcion || 'Sin descripción');
                    $('#verPrecioDetalProducto').text('$' + parseFloat(response.data.precio_detal || 0).toFixed(2));
                    $('#verPrecioMayorProducto').text(response.data.precio_mayor ? '$' + parseFloat(response.data.precio_mayor).toFixed(2) : 'N/A');
                    
                    // Mostrar imagen si existe
                    if (response.data.imagen) {
                        $('#verImagenProducto').attr('src', response.data.imagen).show();
                    } else {
                        $('#verImagenProducto').hide();
                    }
                    
                    $('#verProductoModal').modal('show');
                } else {
                    alert('Error al cargar los datos del producto');
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });

    $(document).on('submit', '#formAgregarProducto', async function(e) {
        e.preventDefault();
        
        // Crear FormData para enviar datos y archivos
        const formData = new FormData(this);
        formData.append('store', true);
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: formData,
            processData: false, // No procesar datos (importante para FormData)
            contentType: false, // No establecer contentType (dejar que jQuery lo maneje)
            success: function(response) {
                if (response.success) {
                    alert('Producto agregado correctamente');
                    $('#agregarProductoModal').modal('hide');
                    tblProduct.ajax.reload();
                } else {
                    alert('Error al agregar el producto: ' + response.message);
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
                    $('#editarProductoId').val(response.data.id_producto);
                    $('#editarNombreProducto').val(response.data.nombre);
                    $('#editarDescripcionProducto').val(response.data.descripcion || '');
                    $('#editarDetalProducto').val(response.data.precio_detal);
                    $('#editarMayorProducto').val(response.data.precio_mayor || '');
                    $('#editarCategoriaProducto').val(response.data.id_categoria);
                    
                    // Mostrar imagen actual si existe
                    if (response.data.imagen) {
                        $('#previewImagenActual').attr('src', response.data.imagen).show();
                    } else {
                        $('#previewImagenActual').hide();
                    }
                    
                    // Limpiar nueva imagen
                    $('#editarImagenProducto').val('');
                    $('#previewNuevaImagenProducto').hide().attr('src', '');
                    
                    $('#formEditarProducto .is-valid, #formEditarProducto .is-invalid').removeClass('is-valid is-invalid');
                    
                    $('#editarProductoModal').modal('show');
                } else {
                    alert('Error al cargar los datos del producto');
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });

    // Previsualización de nueva imagen al editar
    $(document).on('change', '#editarImagenProducto', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('#previewNuevaImagenProducto').attr('src', e.target.result).show();
            };
            reader.readAsDataURL(file);
        } else {
            $('#previewNuevaImagenProducto').hide().attr('src', '');
        }
    });

    $(document).on('submit', '#formEditarProducto', async function(e) {
        e.preventDefault();
        
        // Crear FormData para enviar datos y archivos
        const formData = new FormData(this);
        formData.append('update', true);
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: formData,
            processData: false, // No procesar datos (importante para FormData)
            contentType: false, // No establecer contentType (dejar que jQuery lo maneje)
            success: function(response) {
                if (response.success) {
                    alert('Producto actualizado correctamente');
                    $('#editarProductoModal').modal('hide');
                    tblProduct.ajax.reload();
                } else {
                    alert('Error al actualizar el producto: ' + response.message);
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });
    
    $(document).on('click', '.btn-eliminar', async function() {
        const id = this.value;
        
        if (confirm('¿Está seguro de eliminar este producto?')) {
            $.ajax({
                url: '',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    delete: id
                },
                success: function(response) {
                    if (response.success) {
                        alert('Producto eliminado correctamente');
                        tblProduct.ajax.reload();
                    } else {
                        alert('Error al eliminar el producto: ' + response.message);
                    }
                },
                error: function() {
                    alert('Error de conexión');
                }
            });
        }
    });

   
    $('#agregarProductoModal').on('hidden.bs.modal', function() {
        setTimeout(() => {
            tblProduct.ajax.reload();
        }, 500);
    });

});

