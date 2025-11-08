// productDataTable.js (versión corregida)
import { createDataTable, reloadDataTable, createActionsColumn } from '../helpers/dataTable.js';
import { getById, create, update, remove, executeAjax } from '../helpers/ajax.js';
import { showConfirm, showLoading, closeLoading } from '../helpers/sweetalert.js';
import { animateIn } from '../helpers/animations.js';
import { showSkeleton, hideSkeleton } from '../helpers/skeleton.js';
import { setupImagePreview, clearPreview } from '../helpers/imagePreview.js';

const API_URL = window.productApiUrl || '';

$(document).ready(async function() {
    // Mostrar skeleton mientras carga la tabla
    showSkeleton('#productTable', '#productTable_wrapper');
    
    const tblProduct = createDataTable('#productTable', API_URL, [
        { data: 'id_producto' },
        { data: 'nombre' },
        {
            data: 'imagen',
            render: function(data) {
                return data ? 
                    `<img src="${data}" alt="Imagen producto" style="max-width: 50px; max-height: 50px; border-radius: 4px; object-fit: cover;">` :
                    '<span class="text-muted">Sin imagen</span>';
            }
        },
        {
            data: 'categoria_nombre',
            render: function(data) {
                return data || 'Sin categoría';
            }
        },
        {
            data: 'stock',
            render: function(data) {
                return data || 0;
            }
        },
        {
            data: 'precio_detal',
            render: function(data) {
                return '$' + parseFloat(data || 0).toFixed(2);
            }
        },
        {
            data: 'precio_mayor',
            render: function(data) {
                return data ? '$' + parseFloat(data).toFixed(2) : 'N/A';
            }
        },
        {
            data: 'descripcion',
            render: function(data) {
                return data || 'Sin descripción';
            }
        },
        createActionsColumn({
            idField: 'id_producto',
            btnVer: true,
            btnEditar: true,
            btnEliminar: true
        })
    ], {
        initComplete: function() {
            $('.dataTables_filter input').attr('placeholder', 'Buscar...');
            hideSkeleton('.skeleton-table', '#productTable_wrapper');
            animateIn('#productTable', 400, 100);
        },
        // Agregar manejo de errores en DataTable
        error: function(error) {
            console.error('DataTable Error:', error);
            hideSkeleton('.skeleton-table', '#productTable_wrapper');
            // Mostrar mensaje de error en la tabla
            const api = this.api();
            api.clear().draw();
            const errorMsg = 'Error al cargar los datos. Por favor, recargue la página.';
            api.rows.add([{
                'id_producto': 'Error',
                'nombre': errorMsg,
                'imagen': '',
                'categoria_nombre': '',
                'stock': '',
                'precio_detal': '',
                'precio_mayor': '',
                'descripcion': '',
                'acciones': ''
            }]).draw();
        }
    });

    // Configurar previsualización de imágenes
    setTimeout(() => {
        if ($('#imagenProducto').length) {
            setupImagePreview('#imagenProducto', '#previewImagenProducto');
        }
        
        if ($('#editarImagenProducto').length) {
            setupImagePreview('#editarImagenProducto', '#previewNuevaImagenProducto');
        }
    }, 100);

    // Abrir modal de agregar
    $(document).on('click', '.btn-agregar', function() {
        $('#formAgregarProducto')[0].reset();
        clearPreview('#previewImagenProducto', '#imagenProducto');
        $('#formAgregarProducto').find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        $('#agregarProductoModal').modal('show');
    });

    // Ver producto
    $(document).on('click', '.btn-ver', async function() {
        const id = this.value;
        
        showLoading('Cargando...', 'Obteniendo información del producto');
        
        const success = await executeAjax(
            getById(API_URL, id),
            null,
            (response) => {
                closeLoading();
                $('#verNombreProducto').text(response.data.nombre || '');
                $('#verCategoriaProducto').text(response.data.id_categoria || 'Sin categoría');
                $('#verStockProducto').text(response.data.stock || 0);
                $('#verDescripcionProducto').text(response.data.descripcion || 'Sin descripción');
                $('#verPrecioDetalProducto').text('$' + parseFloat(response.data.precio_detal || 0).toFixed(2));
                $('#verPrecioMayorProducto').text(response.data.precio_mayor ? '$' + parseFloat(response.data.precio_mayor).toFixed(2) : 'N/A');
                
                const $img = $('#verImagenProducto');
                if (response.data.imagen) {
                    $img.attr('src', response.data.imagen).show();
                } else {
                    $img.hide();
                }
                $('#verProductoModal').modal('show');
            }
        );
        
        if (!success) closeLoading();
    });

    // Crear producto - CON VALIDACIÓN MEJORADA
    $(document).on('submit', '#formAgregarProducto', async function(e) {
        e.preventDefault();
        
        // Validación básica del formulario
        const nombre = $('#nombreProducto').val().trim();
        const categoria = $('#categoriaProducto').val();
        const stock = $('#stockProducto').val();
        const precioDetal = $('#detalProducto').val();
        
        if (!nombre || !categoria || !stock || !precioDetal) {
            await showErrorMessage('Por favor, complete todos los campos obligatorios');
            return;
        }
        
        if (parseFloat(stock) < 0) {
            await showErrorMessage('El stock no puede ser negativo');
            return;
        }
        
        if (parseFloat(precioDetal) <= 0) {
            await showErrorMessage('El precio al detal debe ser mayor a 0');
            return;
        }
        
        showLoading('Guardando...', 'Por favor espere mientras se guarda el producto');
        
        const formData = new FormData(this);
        
        const success = await executeAjax(
            create(API_URL, formData, { 
                processData: false, 
                contentType: false,
                timeout: 30000 // 30 segundos timeout
            }),
            'Producto agregado correctamente',
            () => {
                closeLoading();
                $('#agregarProductoModal').modal('hide');
                reloadDataTable(tblProduct);
            }
        );
        
        if (!success) closeLoading();
    });

    // Editar producto - Abrir modal
    $(document).on('click', '.btn-editar', async function() {
        const id = this.value;
        
        showLoading('Cargando...', 'Obteniendo información del producto');
        
        const success = await executeAjax(
            getById(API_URL, id),
            null,
            (response) => {
                closeLoading();
                $('#editarProductoId').val(response.data.id_producto);
                $('#editarNombreProducto').val(response.data.nombre);
                $('#editarDescripcionProducto').val(response.data.descripcion || '');
                $('#editarStockProducto').val(response.data.stock || 0);
                $('#editarDetalProducto').val(response.data.precio_detal);
                $('#editarMayorProducto').val(response.data.precio_mayor || '');
                $('#editarCategoriaProducto').val(response.data.id_categoria);
                
                const $img = $('#previewImagenActual');
                if (response.data.imagen) {
                    $img.attr('src', response.data.imagen).show();
                } else {
                    $img.hide();
                }
                
                $('#editarImagenProducto').val('');
                clearPreview('#previewNuevaImagenProducto', '#editarImagenProducto');
                $('#formEditarProducto').find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                $('#editarProductoModal').modal('show');
            }
        );
        
        if (!success) closeLoading();
    });

    // Actualizar producto
    $(document).on('submit', '#formEditarProducto', async function(e) {
        e.preventDefault();
        
        showLoading('Actualizando...', 'Por favor espere mientras se actualiza el producto');
        
        const formData = new FormData(this);
        
        const success = await executeAjax(
            update(API_URL, formData, { 
                processData: false, 
                contentType: false,
                timeout: 30000
            }),
            'Producto actualizado correctamente',
            () => {
                closeLoading();
                $('#editarProductoModal').modal('hide');
                reloadDataTable(tblProduct);
            }
        );
        
        if (!success) closeLoading();
    });

    // Eliminar producto
    $(document).on('click', '.btn-eliminar', async function() {
        const id = this.value;
        
        const confirmed = await showConfirm(
            '¿Estás seguro?',
            '¿Está seguro de eliminar este producto? Esta acción no se puede deshacer.'
        );
        
        if (confirmed) {
            await executeAjax(
                remove(API_URL, id),
                'Producto eliminado correctamente',
                () => reloadDataTable(tblProduct)
            );
        }
    });

    $('#agregarProductoModal').on('hidden.bs.modal', () => {
        reloadDataTable(tblProduct);
    });
});