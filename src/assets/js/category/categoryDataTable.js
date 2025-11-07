/**
 * Category DataTable - Gestión de categorías con DataTables y AJAX
 * Utiliza módulos modulares para operaciones CRUD y alertas
 */

import { createDataTable, reloadDataTable, clearFormValidation, clearFormFields, createActionsColumn } from '../helpers/dataTable.js';
import { getById, create, update, remove, executeAjax } from '../helpers/ajax.js';
import { showConfirm, showLoading, closeLoading } from '../helpers/sweetalert.js';
import { initAllAnimations, animateIn } from '../helpers/animations.js';
import { showTableSkeleton, hideTableSkeleton } from '../helpers/skeleton.js';

// URL del endpoint (se puede configurar desde la vista si es necesario)
const API_URL = window.categoryApiUrl || '';

$(document).ready(async function() {
    // Inicializar animaciones del sistema
    initAllAnimations();
    
    // Mostrar skeleton mientras carga la tabla
    showTableSkeleton('#categoryTable', 5, 3);
    
    // Inicializar DataTable
    const tblCategory = createDataTable('#categoryTable', API_URL, [
        { data: 'id_categoria' },
        { data: 'nombre' },
        createActionsColumn(null, {
            idField: 'id_categoria',
            verTitle: 'Ver categoría',
            editarTitle: 'Editar categoría',
            eliminarTitle: 'Eliminar categoría'
        })
    ], {
        initComplete: function() {
            $('.dataTables_filter input').attr('placeholder', 'Buscar...');
            // Ocultar skeleton y mostrar tabla con animación
            hideTableSkeleton('#categoryTable');
            animateIn('#categoryTable', 400, 100);
        }
    });

    // Abrir modal de agregar
    $(document).on('click', '.btn-agregar', async function() {
        clearFormFields('#formAgregarCategoria', ['nombreCategoria']);
        clearFormValidation('#formAgregarCategoria');
        $('#agregarCategoriaModal').modal('show');
    });

    // Ver categoría
    $(document).on('click', '.btn-ver', async function() {
        const id = this.value;
        
        const success = await executeAjax(
            getById(API_URL, id),
            null,
            function(response) {
                $('#verCategoriaId').text(response.data.id_categoria);
                $('#verNombreCategoria').text(response.data.nombre);
                $('#verCategoriaModal').modal('show');
            }
        );
    });

    // Crear categoría
    $(document).on('submit', '#formAgregarCategoria', async function(e) {
        e.preventDefault();
        
        showLoading('Guardando...', 'Por favor espere mientras se guarda la categoría');
        
        const formData = {
            nombre: $('#nombreCategoria').val()
        };
        
        const success = await executeAjax(
            create(API_URL, formData),
            'Categoría agregada correctamente',
            function() {
                closeLoading();
                $('#agregarCategoriaModal').modal('hide');
                reloadDataTable(tblCategory);
            }
        );
        
        if (!success) {
            closeLoading();
        }
    });

    // Editar categoría - Abrir modal
    $(document).on('click', '.btn-editar', async function() {
        const id = this.value;
        
        const success = await executeAjax(
            getById(API_URL, id),
            null,
            function(response) {
                $('#editarCategoriaId').val(response.data.id_categoria);
                $('#editarNombreCategoria').val(response.data.nombre);
                clearFormValidation('#formEditarCategoria');
                $('#editarCategoriaModal').modal('show');
            }
        );
    });

    // Actualizar categoría
    $(document).on('submit', '#formEditarCategoria', async function(e) {
        e.preventDefault();
        
        showLoading('Actualizando...', 'Por favor espere mientras se actualiza la categoría');
        
        const formData = {
            id_categoria: $('#editarCategoriaId').val(),
            nombre: $('#editarNombreCategoria').val()
        };
        
        const success = await executeAjax(
            update(API_URL, formData),
            'Categoría actualizada correctamente',
            function() {
                closeLoading();
                $('#editarCategoriaModal').modal('hide');
                reloadDataTable(tblCategory);
            }
        );
        
        if (!success) {
            closeLoading();
        }
    });

    // Eliminar categoría
    $(document).on('click', '.btn-eliminar', async function() {
        const id = this.value;
        
        const confirmed = await showConfirm(
            '¿Estás seguro?',
            '¿Está seguro de eliminar esta categoría?',
            'Sí, eliminar',
            'Cancelar'
        );
        
        if (confirmed) {
            const success = await executeAjax(
                remove(API_URL, id),
                'Categoría eliminada correctamente',
                function() {
                    reloadDataTable(tblCategory);
                }
            );
        }
    });

    // Recargar tabla al cerrar modal
    $('#agregarCategoriaModal').on('hidden.bs.modal', function() {
        reloadDataTable(tblCategory, 500);
    });
});
