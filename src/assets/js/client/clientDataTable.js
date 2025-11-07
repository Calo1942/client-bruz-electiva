/**
 * Client DataTable - Gestión de clientes con DataTables y AJAX
 * Utiliza módulos modulares para operaciones CRUD y alertas
 */

import { createDataTable, reloadDataTable, clearFormValidation, clearFormFields, createActionsColumn } from '../helpers/dataTable.js';
import { getById, create, update, remove, executeAjax } from '../helpers/ajax.js';
import { showConfirm, showLoading, closeLoading } from '../helpers/sweetalert.js';
import { initAllAnimations, animateIn, fixModalAriaHidden } from '../helpers/animations.js';
import { showTableSkeleton, hideTableSkeleton } from '../helpers/skeleton.js';

// URL del endpoint (se puede configurar desde la vista si es necesario)
const API_URL = window.clientApiUrl || '';

$(document).ready(async function() {
    // Inicializar animaciones del sistema
    initAllAnimations();
    // Corregir problema de aria-hidden en modales
    fixModalAriaHidden();
    
    // Mostrar skeleton mientras carga la tabla
    showTableSkeleton('#clientTable', 5, 6);
    
    // Inicializar DataTable
    const tblClient = createDataTable('#clientTable', API_URL, [
        { data: 'cedula' },
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'correo' },
        { data: 'telefono' },
        createActionsColumn(null, {
            idField: 'cedula',
            verTitle: 'Ver cliente',
            editarTitle: 'Editar cliente',
            eliminarTitle: 'Eliminar cliente'
        })
    ], {
        initComplete: function() {
            $('.dataTables_filter input').attr('placeholder', 'Buscar...');
            // Ocultar skeleton y mostrar tabla con animación
            hideTableSkeleton('#clientTable');
            animateIn('#clientTable', 400, 100);
        }
    });

    // Abrir modal de agregar
    $(document).on('click', '.btn-agregar', async function() {
        clearFormFields('#formAgregarCliente', [
            'cedulaCliente',
            'nombreCliente',
            'apellidoCliente',
            'emailCliente',
            'telefonoCliente'
        ]);
        clearFormValidation('#formAgregarCliente');
        $('#agregarClienteModal').modal('show');
    });

    // Ver cliente
    $(document).on('click', '.btn-ver', async function() {
        const cedula = this.value;
        
        const success = await executeAjax(
            getById(API_URL, cedula),
            null,
            function(response) {
                $('#verCedula').text(response.data.cedula);
                $('#verNombre').text(response.data.nombre);
                $('#verApellido').text(response.data.apellido);
                $('#verCorreo').text(response.data.correo);
                $('#verTelefono').text(response.data.telefono);
                $('#verClienteModal').modal('show');
            }
        );
    });

    // Crear cliente
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
            function() {
                closeLoading();
                $('#agregarClienteModal').modal('hide');
                reloadDataTable(tblClient);
            }
        );
        
        if (!success) {
            closeLoading();
        }
    });

    // Editar cliente - Abrir modal
    $(document).on('click', '.btn-editar', async function() {
        const cedula = this.value;
        
        const success = await executeAjax(
            getById(API_URL, cedula),
            null,
            function(response) {
                $('#editarCedula').val(response.data.cedula);
                $('#editarNombre').val(response.data.nombre);
                $('#editarApellido').val(response.data.apellido);
                $('#editarCorreo').val(response.data.correo);
                $('#editarTelefono').val(response.data.telefono);
                clearFormValidation('#formEditarCliente');
                $('#editarClienteModal').modal('show');
            }
        );
    });

    // Actualizar cliente
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
            function() {
                closeLoading();
                $('#editarClienteModal').modal('hide');
                reloadDataTable(tblClient);
            }
        );
        
        if (!success) {
            closeLoading();
        }
    });

    // Eliminar cliente
    $(document).on('click', '.btn-eliminar', async function() {
        const cedula = this.value;
        
        const confirmed = await showConfirm(
            '¿Estás seguro?',
            '¿Está seguro de eliminar este cliente?',
            'Sí, eliminar',
            'Cancelar'
        );
        
        if (confirmed) {
            const success = await executeAjax(
                remove(API_URL, cedula),
                'Cliente eliminado correctamente',
                function() {
                    reloadDataTable(tblClient);
                }
            );
        }
    });

    // Recargar tabla al cerrar modal
    $('#agregarClienteModal').on('hidden.bs.modal', function() {
        reloadDataTable(tblClient, 500);
    });
});
