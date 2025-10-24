<div class="modal fade" id="verClienteModal" tabindex="-1" aria-labelledby="verClienteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Header del modal con título y botón para cerrar -->
            <div class="modal-header">
                <h5 class="modal-title" id="verClienteModalLabel">Detalles del Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <!-- Cuerpo del modal que muestra la información del cliente -->
            <div class="modal-body">
                <p><strong>Cédula:</strong> <span id="verCedula"></span></p>
                <p><strong>Nombre:</strong> <span id="verNombre"></span></p>
                <p><strong>Apellido:</strong> <span id="verApellido"></span></p>
                <p><strong>Correo:</strong> <span id="verCorreo"></span></p>
                <p><strong>Teléfono:</strong> <span id="verTelefono"></span></p>
            </div>
            <!-- Footer del modal con botón para cerrar -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>