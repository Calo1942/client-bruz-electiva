<!-- Encabezado de la tabla con título y botón de agregar -->
<div class="d-flex align-items-center mb-3">
    <h2 class="me-2 mb-0 titulo">Tallas</h2>
    <button class="btn btn-agregar" data-bs-toggle="modal" data-bs-target="#agregarTallaModal">
        <i class="bi bi-plus-lg icon-center"></i> 
</div>

<!-- Contenedor de la tabla -->
<div class="container mt-4">
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($tallas)): ?>
                    <?php foreach ($tallas as $talla): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($talla['IdTalla']); ?></td>
                            <td><?php echo htmlspecialchars($talla['Nombre']); ?></td>
                            <td>
                                <!-- Botones de acciones para los modales -->
                                <button type="button" class="btn btn-sm btn-primary me-1 view-size-btn"
                                        data-bs-toggle="modal" data-bs-target="#verTallaModal"
                                        data-id="<?php echo htmlspecialchars($talla['IdTalla']); ?>"
                                        data-name="<?php echo htmlspecialchars($talla['Nombre']); ?>">
                                    <i class="bi bi-eye"></i>
                                </button>

                                <button type="button" class="btn btn-sm btn-secondary me-1 edit-size-btn"
                                        data-bs-toggle="modal" data-bs-target="#editarTallaModal"
                                        data-id="<?php echo htmlspecialchars($talla['IdTalla']); ?>"
                                        data-name="<?php echo htmlspecialchars($talla['Nombre']); ?>">
                                    <i class="bi bi-pencil-square"></i>
                                </button>

                                <form action="" method="POST" class="d-inline">
                                    <button type="submit" name="delete" value="<?php echo htmlspecialchars($talla['IdTalla']); ?>" class="btn btn-sm btn-danger" onclick="return confirm('¿Estás seguro de que quieres eliminar esta talla?');">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="3" class="text-center">No hay tallas disponibles.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<script>
    // Esperamos a que el documento HTML esté completamente cargado antes de ejecutar el código
    document.addEventListener('DOMContentLoaded', function() {
        // ===== MODAL DE VER TALLA =====
        // Obtenemos una referencia al modal de ver talla usando su ID
        var viewSizeModal = document.getElementById('verTallaModal');
        
        // Agregamos un evento que se dispara cuando el modal está a punto de abrirse
        viewSizeModal.addEventListener('show.bs.modal', function (event) {
            // Obtenemos el botón que activó el modal (el que tiene los datos de la talla)
            var button = event.relatedTarget;
            
            // Extraemos los datos de la talla del botón
            var id = button.getAttribute('data-id');
            var name = button.getAttribute('data-name');

            // Buscamos los elementos dentro del modal donde mostraremos la información
            var modalIdSpan = viewSizeModal.querySelector('#verTallaId');
            var modalNameSpan = viewSizeModal.querySelector('#verNombreTalla');

            // Actualizamos el contenido del modal con los datos de la talla
            modalIdSpan.textContent = id;
            modalNameSpan.textContent = name;
        });

        // ===== MODAL DE EDITAR TALLA =====
        // Obtenemos una referencia al modal de editar talla
        var editSizeModal = document.getElementById('editarTallaModal');
        
        // Agregamos un evento que se dispara cuando el modal está a punto de abrirse
        editSizeModal.addEventListener('show.bs.modal', function (event) {
            // Obtenemos el botón que activó el modal
            var button = event.relatedTarget;
            
            // Extraemos los datos de la talla del botón
            var id = button.getAttribute('data-id');
            var name = button.getAttribute('data-name');

            // Buscamos los campos de entrada dentro del modal
            var modalIdInput = editSizeModal.querySelector('#editarTallaId');
            var modalNameInput = editSizeModal.querySelector('#editarNombreTalla');

            // Prellenamos los campos del formulario con los datos actuales de la talla
            modalIdInput.value = id;
            modalNameInput.value = name;
        });
    });
</script>