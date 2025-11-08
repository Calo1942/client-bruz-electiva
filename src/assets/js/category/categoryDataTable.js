// categoryDataTable.js (adaptado)
import { createDataTable, reloadDataTable, createActionsColumn } from '../helpers/dataTable.js';
import { getById, create, update, remove, executeAjax } from '../helpers/ajax.js';
import { showConfirm, showLoading, closeLoading } from '../helpers/sweetalert.js';
import { animateIn } from '../helpers/animations.js';
import { showSkeleton, hideSkeleton } from '../helpers/skeleton.js';

const API_URL = window.categoryApiUrl || '';

$(document).ready(async function() {
    showSkeleton('#categoryTable', '#categoryTable_wrapper');
    
    const tblCategory = createDataTable('#categoryTable', API_URL, [
        { data: 'id_categoria' },
        { data: 'nombre' },
        createActionsColumn({
            idField: 'id_categoria',
            btnVer: true,
            btnEditar: true,
            btnEliminar: true
        })
    ], {
        initComplete: function() {
            $('.dataTables_filter input').attr('placeholder', 'Buscar...');
            hideSkeleton('.skeleton-table', '#categoryTable_wrapper');
            animateIn('#categoryTable', 400, 100);
        }
    });

    $(document).on('click', '.btn-agregar', function() {
        $('#formAgregarCategoria')[0].reset();
        $('#formAgregarCategoria').find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        $('#agregarCategoriaModal').modal('show');
    });

    $(document).on('click', '.btn-ver', async function() {
        const id = this.value;
        
        await executeAjax(
            getById(API_URL, id),
            null,
            (response) => {
                $('#verCategoriaId').text(response.data.id_categoria);
                $('#verNombreCategoria').text(response.data.nombre);
                $('#verCategoriaModal').modal('show');
            }
        );
    });

    $(document).on('submit', '#formAgregarCategoria', async function(e) {
        e.preventDefault();
        
        showLoading('Guardando...', 'Por favor espere mientras se guarda la categoría');
        
        const formData = {
            nombre: $('#nombreCategoria').val()
        };
        
        const success = await executeAjax(
            create(API_URL, formData),
            'Categoría agregada correctamente',
            () => {
                closeLoading();
                $('#agregarCategoriaModal').modal('hide');
                reloadDataTable(tblCategory);
            }
        );
        
        if (!success) closeLoading();
    });

    $(document).on('click', '.btn-editar', async function() {
        const id = this.value;
        
        await executeAjax(
            getById(API_URL, id),
            null,
            (response) => {
                $('#editarCategoriaId').val(response.data.id_categoria);
                $('#editarNombreCategoria').val(response.data.nombre);
                $('#formEditarCategoria').find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                $('#editarCategoriaModal').modal('show');
            }
        );
    });

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
            () => {
                closeLoading();
                $('#editarCategoriaModal').modal('hide');
                reloadDataTable(tblCategory);
            }
        );
        
        if (!success) closeLoading();
    });

    $(document).on('click', '.btn-eliminar', async function() {
        const id = this.value;
        
        const confirmed = await showConfirm(
            '¿Estás seguro?',
            '¿Está seguro de eliminar esta categoría?'
        );
        
        if (confirmed) {
            await executeAjax(
                remove(API_URL, id),
                'Categoría eliminada correctamente',
                () => reloadDataTable(tblCategory)
            );
        }
    });

    $('#agregarCategoriaModal').on('hidden.bs.modal', () => {
        reloadDataTable(tblCategory);
    });
});