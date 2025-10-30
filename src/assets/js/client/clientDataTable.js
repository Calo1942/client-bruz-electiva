$(document).ready(async function() {
    const tblClient = $('#clientTable').DataTable({
        ajax: {
            url: '',
            method: 'POST',
            data: {
                getAll: true
            },
            dataSrc: 'data'
        },
        columns: [
            {data: 'cedula'},    
            {data: 'nombre'},
            {data: 'apellido'},
            {data: 'correo'},
            {data: 'telefono'},
            {data: null, render: (data)=>{
                const btnVer = `<button value="${data.cedula}" type="button" class="btn btn-sm btn-primary me-1 btn-ver" title="Ver cliente">
                    <i class="bi bi-eye"></i>
                </button>`;
                const btnEditar = `<button value="${data.cedula}" type="button" class="btn btn-sm btn-secondary me-1 btn-editar" title="Editar cliente">
                    <i class="bi bi-pencil-square"></i>
                </button>`;
                const btnEliminar = `<button value="${data.cedula}" type="button" class="btn btn-sm btn-danger btn-eliminar" title="Eliminar cliente">
                    <i class="bi bi-trash"></i>
                </button>`;

                return `${btnVer} ${btnEditar} ${btnEliminar}`;
            }}
        ],
        autoWidth: false,
        "columnDefs": [
            {targets: [0, 1, 2, 3, 4], className: 'tabla'},
            { orderable: false, className: 'acciones', targets: [5] }
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
        
        $('#cedulaCliente').val('');
        $('#nombreCliente').val('');
        $('#apellidoCliente').val('');
        $('#emailCliente').val('');
        $('#telefonoCliente').val('');
       
        $('#formAgregarCliente .is-valid, #formAgregarCliente .is-invalid').removeClass('is-valid is-invalid');
        
        $('#agregarClienteModal').modal('show');
    }); 

    $(document).on('click', '.btn-ver', async function() {
        const cedula = this.value;
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: {
                show: cedula
            },
            success: function(response) {
                if (response.success) {
                    $('#verCedula').text(response.data.cedula);
                    $('#verNombre').text(response.data.nombre);
                    $('#verApellido').text(response.data.apellido);
                    $('#verCorreo').text(response.data.correo);
                    $('#verTelefono').text(response.data.telefono);
                    
                    $('#verClienteModal').modal('show');
                } else {
                    alert('Error al cargar los datos del cliente');
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });

    $(document).on('submit', '#formAgregarCliente', async function(e) {
        e.preventDefault();
        
        const formData = {
            cedula: $('#cedulaCliente').val(),
            nombre: $('#nombreCliente').val(),
            apellido: $('#apellidoCliente').val(),
            correo: $('#emailCliente').val(),
            telefono: $('#telefonoCliente').val(),
            store: true
        };
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: formData,
            success: function(response) {
                if (response.success) {
                    alert('Cliente agregado correctamente');
                    $('#agregarClienteModal').modal('hide');
                    tblClient.ajax.reload();
                } else {
                    alert('Error al agregar el cliente: ' + response.message);
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });

    $(document).on('click', '.btn-editar', async function() {
        const cedula = this.value;
        
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: {
                show: cedula
            },
            success: function(response) {
                if (response.success) {
                    $('#editarCedula').val(response.data.cedula);
                    $('#editarNombre').val(response.data.nombre);
                    $('#editarApellido').val(response.data.apellido);
                    $('#editarCorreo').val(response.data.correo);
                    $('#editarTelefono').val(response.data.telefono);
                    
                    $('#formEditarCliente .is-valid, #formEditarCliente .is-invalid').removeClass('is-valid is-invalid');
                    
                    $('#editarClienteModal').modal('show');
                } else {
                    alert('Error al cargar los datos del cliente');
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });

    $(document).on('submit', '#formEditarCliente', async function(e) {
        e.preventDefault();
        
        const formData = {
            cedula: $('#editarCedula').val(),
            nombre: $('#editarNombre').val(),
            apellido: $('#editarApellido').val(),
            correo: $('#editarCorreo').val(),
            telefono: $('#editarTelefono').val(),
            update: true
        };
        
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'JSON',
            data: formData,
            success: function(response) {
                if (response.success) {
                    alert('Cliente actualizado correctamente');
                    $('#editarClienteModal').modal('hide');
                    tblClient.ajax.reload();
                } else {
                    alert('Error al actualizar el cliente: ' + response.message);
                }
            },
            error: function() {
                alert('Error de conexión');
            }
        });
    });
    
    $(document).on('click', '.btn-eliminar', async function() {
        const cedula = this.value;
        
        if (confirm('¿Está seguro de eliminar este cliente?')) {
            $.ajax({
                url: '',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    delete: cedula
                },
                success: function(response) {
                    if (response.success) {
                        alert('Cliente eliminado correctamente');
                        tblClient.ajax.reload();
                    } else {
                        alert('Error al eliminar el cliente: ' + response.message);
                    }
                },
                error: function() {
                    alert('Error de conexión');
                }
            });
        }
    });

   
    $('#agregarClienteModal').on('hidden.bs.modal', function() {
        setTimeout(() => {
            tblClient.ajax.reload();
        }, 500);
    });

});
