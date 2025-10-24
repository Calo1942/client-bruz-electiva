$(document).ready(async function() {
    // Inicializar DataTable para clientes
    const tblClient = $('#clientTable').DataTable({
        ajax: {
            url: '',
            method: 'POST',
            data: {
                getClients: true
            },
            dataSrc: ''
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
        }
    });

    // Evento para ver cliente
    $(document).on('click', '.btn-ver', async function() {
        const cedula = this.value;
        
        // Obtener datos del cliente
        $.ajax({
            url: 'src/Controllers/ClientController.php',
            method: 'POST',
            dataType: 'JSON',
            data: {
                cedula: cedula,
                showClient: true
            },
            success: function(response) {
                if (response.success) {
                    // Llenar modal de visualización
                    $('#verCedula').text(response.data.cedula);
                    $('#verNombre').text(response.data.nombre);
                    $('#verApellido').text(response.data.apellido);
                    $('#verCorreo').text(response.data.correo);
                    $('#verTelefono').text(response.data.telefono);
                    
                    // Abrir modal
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

    // Evento para editar cliente
    $(document).on('click', '.btn-editar', async function() {
        const cedula = this.value;
        
        // Obtener datos del cliente
        $.ajax({
            url: 'src/Controllers/ClientController.php',
            method: 'POST',
            dataType: 'JSON',
            data: {
                cedula: cedula,
                showClient: true
            },
            success: function(response) {
                if (response.success) {
                    // Llenar formulario de edición
                    $('#editarCedula').val(response.data.cedula);
                    $('#editarNombre').val(response.data.nombre);
                    $('#editarApellido').val(response.data.apellido);
                    $('#editarCorreo').val(response.data.correo);
                    $('#editarTelefono').val(response.data.telefono);
                    
                    // Abrir modal
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

    // Evento para eliminar cliente
    $(document).on('click', '.btn-eliminar', async function() {
        const cedula = this.value;
        
        if (confirm('¿Está seguro de eliminar este cliente?')) {
            $.ajax({
                url: 'src/Controllers/ClientController.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    cedula: cedula,
                    deleteClient: true
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

    // Evento para recargar tabla después de crear cliente
    $('#agregarClienteModal').on('hidden.bs.modal', function() {
        // Verificar si el formulario se envió correctamente
        // Esto se puede mejorar con un flag o evento personalizado
        setTimeout(() => {
            tblClient.ajax.reload();
        }, 500);
    });

    // Evento para recargar tabla después de editar cliente
    $('#editarClienteModal').on('hidden.bs.modal', function() {
        // Verificar si el formulario se envió correctamente
        setTimeout(() => {
            tblClient.ajax.reload();
        }, 500);
    });
});
