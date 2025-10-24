<div class="modal fade" id="agregarClienteModal" tabindex="-1" aria-labelledby="agregarClienteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="agregarClienteModalLabel">Agregar Nuevo Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formAgregarCliente" action="" method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="cedulaCliente" class="form-label">Cédula *</label>
                        <input type="text" class="form-control" id="cedulaCliente" name="cedula" 
                               required minlength="7" maxlength="15" 
                               pattern="[0-9]+" 
                               title="La cédula debe contener solo números y tener entre 7 y 15 dígitos">
                    </div>
                    <div class="mb-3">
                        <label for="nombreCliente" class="form-label">Nombre *</label>
                        <input type="text" class="form-control" id="nombreCliente" name="nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="apellidoCliente" class="form-label">Apellido *</label>
                        <input type="text" class="form-control" id="apellidoCliente" name="apellido" required>
                    </div>
                    <div class="mb-3">
                        <label for="emailCliente" class="form-label">Email *</label>
                        <input type="email" class="form-control" id="emailCliente" name="correo" 
                               required maxlength="50"
                               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                               title="Ingrese un email válido">
                    </div>
                    <div class="mb-3">
                        <label for="telefonoCliente" class="form-label">Teléfono *</label>
                        <input type="tel" class="form-control" id="telefonoCliente" name="telefono" 
                               required minlength="10" maxlength="25"
                               pattern="[0-9+\-\s()]+"
                               title="Ingrese un número de teléfono válido">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary" name="store">Guardar Cliente</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>