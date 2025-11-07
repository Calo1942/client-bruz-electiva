/**
 * Product DataTable - Gestión de productos con DataTables y AJAX
 * Utiliza módulos modulares para operaciones CRUD y alertas
 */

import { createDataTable, reloadDataTable, clearFormValidation, clearFormFields, createActionsColumn } from '../helpers/dataTable.js';
import { getAll, getById, create, update, remove, executeAjax } from '../helpers/ajax.js';
import { showConfirm, showLoading, closeLoading } from '../helpers/sweetalert.js';
import { initAllAnimations, animateIn, fixModalAriaHidden } from '../helpers/animations.js';
import { showTableSkeleton, hideTableSkeleton, withSkeleton } from '../helpers/skeleton.js';
import { setupImagePreview, showExistingImage, clearPreview } from '../helpers/imagePreview.js';

// URL del endpoint (se puede configurar desde la vista si es necesario)
const API_URL = window.productApiUrl || '';

$(document).ready(async function() {
    // Inicializar animaciones del sistema
    initAllAnimations();
    // Corregir problema de aria-hidden en modales
    fixModalAriaHidden();
    
    // Mostrar skeleton mientras carga la tabla
    const $skeleton = showTableSkeleton('#productTable', 5, 8);
    
    // Inicializar DataTable
    const tblProduct = createDataTable('#productTable', API_URL, [
        { data: 'id_producto' },
        { data: 'nombre' },
        {
            data: 'imagen',
            render: function(data) {
                if (data) {
                    return `<img src="${data}" alt="Imagen producto" style="max-width: 50px; max-height: 50px; border-radius: 4px; object-fit: cover;">`;
                }
                return '<span class="text-muted">Sin imagen</span>';
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
        createActionsColumn(null, {
            idField: 'id_producto',
            verTitle: 'Ver producto',
            editarTitle: 'Editar producto',
            eliminarTitle: 'Eliminar producto'
        })
    ], {
        initComplete: function() {
            $('.dataTables_filter input').attr('placeholder', 'Buscar...');
            // Ocultar skeleton y mostrar tabla con animación
            hideTableSkeleton('#productTable');
            animateIn('#productTable', 400, 100);
        }
    });

    // Configurar previsualización de imágenes
    // Esperar a que el DOM esté completamente cargado
    setTimeout(function() {
        // Configurar preview para modal de crear
        if ($('#imagenProducto').length) {
            setupImagePreview('#imagenProducto', '#previewImagenProducto', {
                maxSize: 5 * 1024 * 1024,
                allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
                previewWidth: 200,
                previewHeight: 200,
                showRemoveButton: true,
                animate: true
            });
        }
        
        // Configurar preview para modal de editar
        if ($('#editarImagenProducto').length) {
            setupImagePreview('#editarImagenProducto', '#previewNuevaImagenProducto', {
                maxSize: 5 * 1024 * 1024,
                allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
                previewWidth: 200,
                previewHeight: 200,
                showRemoveButton: true,
                animate: true
            });
        }
    }, 100);

    // Abrir modal de agregar
    $(document).on('click', '.btn-agregar', async function() {
        clearFormFields('#formAgregarProducto', [
            'nombreProducto',
            'categoriaProducto',
            'descripcionProducto',
            'stockProducto',
            'detalProducto',
            'mayorProducto',
            'imagenProducto'
        ]);
        clearPreview('#previewImagenProducto', '#imagenProducto');
        clearFormValidation('#formAgregarProducto');
        $('#agregarProductoModal').modal('show');
    });

    // Ver producto
    $(document).on('click', '.btn-ver', async function() {
        const id = this.value;
        
        showLoading('Cargando...', 'Obteniendo información del producto');
        
        const success = await executeAjax(
            getById(API_URL, id),
            null,
            function(response) {
                closeLoading();
                $('#verNombreProducto').text(response.data.nombre || '');
                $('#verCategoriaProducto').text(response.data.id_categoria || 'Sin categoría');
                $('#verStockProducto').text(response.data.stock || 0);
                $('#verDescripcionProducto').text(response.data.descripcion || 'Sin descripción');
                $('#verPrecioDetalProducto').text('$' + parseFloat(response.data.precio_detal || 0).toFixed(2));
                $('#verPrecioMayorProducto').text(response.data.precio_mayor ? '$' + parseFloat(response.data.precio_mayor).toFixed(2) : 'N/A');
                
                showExistingImage('#verImagenProducto', response.data.imagen, true);
                //console.log(response.data.imagen);
                $('#verProductoModal').modal('show');
            }
        );
        
        if (!success) {
            closeLoading();
        }
    });

    // Crear producto
    $(document).on('submit', '#formAgregarProducto', async function(e) {
        e.preventDefault();
        
        showLoading('Guardando...', 'Por favor espere mientras se guarda el producto');
        
        const formData = new FormData(this);
        
        const success = await executeAjax(
            create(API_URL, formData, { processData: false, contentType: false }),
            'Producto agregado correctamente',
            function() {
                closeLoading();
                $('#agregarProductoModal').modal('hide');
                reloadDataTable(tblProduct);
            }
        );
        
        if (!success) {
            closeLoading();
        }
    });

    // Editar producto - Abrir modal
    $(document).on('click', '.btn-editar', async function() {
        const id = this.value;
        
        showLoading('Cargando...', 'Obteniendo información del producto');
        
        const success = await executeAjax(
            getById(API_URL, id),
            null,
            function(response) {
                closeLoading();
                $('#editarProductoId').val(response.data.id_producto);
                $('#editarNombreProducto').val(response.data.nombre);
                $('#editarDescripcionProducto').val(response.data.descripcion || '');
                $('#editarStockProducto').val(response.data.stock || 0);
                $('#editarDetalProducto').val(response.data.precio_detal);
                $('#editarMayorProducto').val(response.data.precio_mayor || '');
                $('#editarCategoriaProducto').val(response.data.id_categoria);
                
                showExistingImage('#previewImagenActual', response.data.imagen, true);
                
                $('#editarImagenProducto').val('');
                clearPreview('#previewNuevaImagenProducto', '#editarImagenProducto');
                clearFormValidation('#formEditarProducto');
                $('#editarProductoModal').modal('show');
            }
        );
        
        if (!success) {
            closeLoading();
        }
    });

    // Actualizar producto
    $(document).on('submit', '#formEditarProducto', async function(e) {
        e.preventDefault();
        
        showLoading('Actualizando...', 'Por favor espere mientras se actualiza el producto');
        
        const formData = new FormData(this);
        
        const success = await executeAjax(
            update(API_URL, formData, { processData: false, contentType: false }),
            'Producto actualizado correctamente',
            function() {
                closeLoading();
                $('#editarProductoModal').modal('hide');
                reloadDataTable(tblProduct);
            }
        );
        
        if (!success) {
            closeLoading();
        }
    });

    // Eliminar producto
    $(document).on('click', '.btn-eliminar', async function() {
        const id = this.value;
        
        const confirmed = await showConfirm(
            '¿Estás seguro?',
            '¿Está seguro de eliminar este producto?',
            'Sí, eliminar',
            'Cancelar'
        );
        
        if (confirmed) {
            const success = await executeAjax(
                remove(API_URL, id),
                'Producto eliminado correctamente',
                function() {
                    reloadDataTable(tblProduct);
                }
            );
        }
    });

    // Recargar tabla al cerrar modal
    $('#agregarProductoModal').on('hidden.bs.modal', function() {
        reloadDataTable(tblProduct, 500);
    });
});
