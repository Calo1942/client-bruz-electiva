<div class="d-flex align-items-center mb-3">
    <!-- Título y botón para abrir modal de agregar cliente -->
    <h2 class="me-2 mb-0 titulo">Clientes</h2>
    <button class="btn btn-agregar" data-bs-toggle="modal" data-bs-target="#agregarClienteModal">
        <i class="bi bi-plus-lg icon-center"></i>
    </button>
</div>
<div class="container mt-4">
    <div class="table-responsive">
        <!-- Tabla con datos de clientes -->
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <!-- Encabezados de la tabla -->
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($clientes)): ?>
                    <?php foreach ($clientes as $cliente): ?>
                        <tr>
                            <!-- Datos del cliente con protección contra XSS -->
                            <td><?php echo htmlspecialchars($cliente['cedula']); ?></td>
                            <td><?php echo htmlspecialchars($cliente['nombre']); ?></td>
                            <td><?php echo htmlspecialchars($cliente['apellido']); ?></td>
                            <td><?php echo htmlspecialchars($cliente['correo']); ?></td>
                            <td><?php echo htmlspecialchars($cliente['telefono']); ?></td>
                            <td>
                                <!-- Botón para ver detalles, abre modal con datos del cliente -->
                                <button type="button" class="btn btn-sm btn-primary me-1 view-client-btn"
                                    data-bs-toggle="modal" data-bs-target="#verClienteModal"
                                    data-cedula="<?php echo htmlspecialchars($cliente['cedula']); ?>"
                                    data-nombre="<?php echo htmlspecialchars($cliente['nombre']); ?>"
                                    data-apellido="<?php echo htmlspecialchars($cliente['apellido']); ?>"
                                    data-correo="<?php echo htmlspecialchars($cliente['correo']); ?>"
                                    data-telefono="<?php echo htmlspecialchars($cliente['telefono']); ?>">
                                    <i class="bi bi-eye"></i>
                                </button>

                                <!-- Botón para editar cliente, abre modal con formulario -->
                                <button type="button" class="btn btn-sm btn-secondary me-1 edit-client-btn"
                                    data-bs-toggle="modal" data-bs-target="#editarClienteModal"
                                    data-cedula="<?php echo htmlspecialchars($cliente['cedula']); ?>"
                                    data-nombre="<?php echo htmlspecialchars($cliente['nombre']); ?>"
                                    data-apellido="<?php echo htmlspecialchars($cliente['apellido']); ?>"
                                    data-correo="<?php echo htmlspecialchars($cliente['correo']); ?>"
                                    data-telefono="<?php echo htmlspecialchars($cliente['telefono']); ?>">
                                    <i class="bi bi-pencil-square"></i>
                                </button>

                                <!-- Formulario para eliminar cliente con confirmación -->
                                <form action="" method="POST" class="d-inline">
                                    <button type="submit" name="delete" value="<?php echo htmlspecialchars($cliente['cedula']); ?>" class="btn btn-sm btn-danger" onclick="return confirm('¿Estás seguro de que quieres eliminar a este cliente?');">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <!-- Mensaje si no hay clientes disponibles -->
                    <tr>
                        <td colspan="6" class="text-center">No hay clientes disponibles.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Evento para llenar modal de visualización con datos del cliente
        var viewClientModal = document.getElementById('verClienteModal');
        viewClientModal.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var cedula = button.getAttribute('data-cedula');
            var nombre = button.getAttribute('data-nombre');
            var apellido = button.getAttribute('data-apellido');
            var correo = button.getAttribute('data-correo');
            var telefono = button.getAttribute('data-telefono');

            // Asigna los datos a los elementos del modal
            viewClientModal.querySelector('#verCedula').textContent = cedula;
            viewClientModal.querySelector('#verNombre').textContent = nombre;
            viewClientModal.querySelector('#verApellido').textContent = apellido;
            viewClientModal.querySelector('#verCorreo').textContent = correo;
            viewClientModal.querySelector('#verTelefono').textContent = telefono;
        });

        // Evento para llenar modal de edición con datos del cliente
        var editClientModal = document.getElementById('editarClienteModal');
        editClientModal.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var cedula = button.getAttribute('data-cedula');
            var nombre = button.getAttribute('data-nombre');
            var apellido = button.getAttribute('data-apellido');
            var correo = button.getAttribute('data-correo');
            var telefono = button.getAttribute('data-telefono');

            // Asigna los valores a los campos del formulario en el modal
            editClientModal.querySelector('#editarCedula').value = cedula;
            editClientModal.querySelector('#editarNombre').value = nombre;
            editClientModal.querySelector('#editarApellido').value = apellido;
            editClientModal.querySelector('#editarCorreo').value = correo;
            editClientModal.querySelector('#editarTelefono').value = telefono;
        });
    });
</script>