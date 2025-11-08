// clientDataTable.js (adaptado)
import { createDataTable, reloadDataTable, createActionsColumn } from '../helpers/dataTable.js';
import { getById, create, update, remove, executeAjax } from '../helpers/ajax.js';
import { showConfirm, showLoading, closeLoading } from '../helpers/sweetalert.js';
import { animateIn } from '../helpers/animations.js';
import { showSkeleton, hideSkeleton } from '../helpers/skeleton.js';

const API_URL = window.clientApiUrl || '';

$(document).ready(async function() {
    showSkeleton('#clientTable', '#clientTable_wrapper');
    
    const tblClient = createDataTable('#clientTable', API_URL, [
        { data: 'cedula' },
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'correo' },
        { data: 'telefono' },
        createActionsColumn({
            idField: 'cedula',
            btnVer: true,
            btnEditar: true,
            btnEliminar: true
        })
    ], {
        initComplete: function() {
            $('.dataTables_filter input').attr('placeholder', 'Buscar...');
            hideSkeleton('.skeleton-table', '#clientTable_wrapper');
            animateIn('#clientTable', 400, 100);
        }
    });

    $(document).on('click', '.btn-agregar', function() {
        $('#formAgregarCliente')[0].reset();
        $('#formAgregarCliente').find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        $('#agregarClienteModal').modal('show');
    });

    $(document).on('click', '.btn-ver', async function() {
        const cedula = this.value;
        
        await executeAjax(
            getById(API_URL, cedula),
            null,
            (response) => {
                $('#verCedula').text(response.data.cedula);
                $('#verNombre').text(response.data.nombre);
                $('#verApellido').text(response.data.apellido);
                $('#verCorreo').text(response.data.correo);
                $('#verTelefono').text(response.data.telefono);
                $('#verClienteModal').modal('show');
            }
        );
    });

    $(document).on('submit', '#formAgregarCliente', async function(e) {
        e.preventDefault();
        
        showLoading('Guardando...', 'Por favor espere mientras se guarda el cliente');
        
        const formData = {
            cedula: $('#cedulaCliente').val(),
            nombre: $('#nombreCliente').val(),
            apellido: $('#apellidoCliente').val(),
            correo: $('#emailCliente').val(),
            telefono: $('#telefonoCliente').val()
        };
        
        const success = await executeAjax(
            create(API_URL, formData),
            'Cliente agregado correctamente',
            () => {
                closeLoading();
                $('#agregarClienteModal').modal('hide');
                reloadDataTable(tblClient);
            }
        );
        
        if (!success) closeLoading();
    });

    $(document).on('click', '.btn-editar', async function() {
        const cedula = this.value;
        
        await executeAjax(
            getById(API_URL, cedula),
            null,
            (response) => {
                $('#editarCedula').val(response.data.cedula);
                $('#editarNombre').val(response.data.nombre);
                $('#editarApellido').val(response.data.apellido);
                $('#editarCorreo').val(response.data.correo);
                $('#editarTelefono').val(response.data.telefono);
                $('#formEditarCliente').find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                $('#editarClienteModal').modal('show');
            }
        );
    });

    $(document).on('submit', '#formEditarCliente', async function(e) {
        e.preventDefault();
        
        showLoading('Actualizando...', 'Por favor espere mientras se actualiza el cliente');
        
        const formData = {
            cedula: $('#editarCedula').val(),
            nombre: $('#editarNombre').val(),
            apellido: $('#editarApellido').val(),
            correo: $('#editarCorreo').val(),
            telefono: $('#editarTelefono').val()
        };
        
        const success = await executeAjax(
            update(API_URL, formData),
            'Cliente actualizado correctamente',
            () => {
                closeLoading();
                $('#editarClienteModal').modal('hide');
                reloadDataTable(tblClient);
            }
        );
        
        if (!success) closeLoading();
    });

    $(document).on('click', '.btn-eliminar', async function() {
        const cedula = this.value;
        
        const confirmed = await showConfirm(
            '¿Estás seguro?',
            '¿Está seguro de eliminar este cliente?'
        );
        
        if (confirmed) {
            await executeAjax(
                remove(API_URL, cedula),
                'Cliente eliminado correctamente',
                () => reloadDataTable(tblClient)
            );
        }
    });

    $('#agregarClienteModal').on('hidden.bs.modal', () => {
        reloadDataTable(tblClient);
    });
});