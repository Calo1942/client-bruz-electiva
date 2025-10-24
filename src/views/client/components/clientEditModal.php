<div class="modal fade" id="editarClienteModal" tabindex="-1" aria-labelledby="editarClienteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Header del modal con título y botón para cerrar -->
            <div class="modal-header">
                <h5 class="modal-title" id="editarClienteModalLabel">Editar Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <!-- Cuerpo del modal con formulario para editar datos del cliente -->
            <div class="modal-body">
                <form id="formEditarCliente" action="" method="POST">
                    <!-- Campo Cédula: solo lectura para evitar cambios en el identificador -->
                    <div class="mb-3">
                        <label for="editarCedula" class="form-label">Cédula</label>
                        <input type="text" class="form-control" id="editarCedula" name="cedula" required readonly>
                    </div>
                    <!-- Campo Nombre editable -->
                    <div class="mb-3">
                        <label for="editarNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="editarNombre" name="nombre" required>
                    </div>
                    <!-- Campo Apellido editable -->
                    <div class="mb-3">
                        <label for="editarApellido" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="editarApellido" name="apellido" required>
                    </div>
                    <!-- Campo Correo editable -->
                    <div class="mb-3">
                        <label for="editarCorreo" class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" id="editarCorreo" name="correo" required>
                    </div>
                    <!-- Campo Teléfono editable -->
                    <div class="mb-3">
                        <label for="editarTelefono" class="form-label">Teléfono</label>
                        <input type="tel" class="form-control" id="editarTelefono" name="telefono">
                    </div>
            </div>
            <!-- Footer del modal con botones para cancelar o guardar -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" name="update" class="btn btn-primary">Guardar Cambios</button>
            </div>
                </form>
        </div>
    </div>
</div>
