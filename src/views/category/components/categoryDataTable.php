<!-- Encabezado de la tabla con título y botón de agregar -->
<div class="d-flex align-items-center mb-3">
    <h2 class="me-2 mb-0 titulo">Categorías</h2>
    <button class="btn btn-agregar"
        data-bs-toggle="modal"
        data-bs-target="#agregarCategoriaModal">
        <i class="bi bi-plus-lg icon-center"></i>
    </button>
</div>

<!-- Contenedor de la tabla -->
<div class=" ontainer mt-4">
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
                <?php if (!empty($categories)): ?>
                    <?php foreach ($categories as $category): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($category['id_categoria']); ?></td>
                            <td><?php echo htmlspecialchars($category['nombre']); ?></td>
                            <td>
                                <!-- Botones de accione para los modales -->
                                <button type="button" class="btn btn-detalle me-1"
                                    data-bs-toggle="modal" data-bs-target="#verCategoriaModal"
                                    data-id="<?php echo htmlspecialchars($category['id_categoria']); ?>"
                                    data-name="<?php echo htmlspecialchars($category['nombre']); ?>">
                                    <i class="bi bi-eye icon-center mb-0" style="font-size: 1.10rem;"></i>
                                </button>

                                <button type="button" class="btn me-1 p-1 btn-editar" data-bs-toggle="modal" data-bs-target="#editarCategoriaModal"
                                    data-id="<?php echo htmlspecialchars($category['id_categoria']); ?>"
                                    data-name="<?php echo htmlspecialchars($category['nombre']); ?>">
                                    <i class="bi bi-pencil-square fs-6 icon-center"></i>
                                </button>

                                <form action="" method="POST" class="d-inline">
                                    <button type="submit" name="delete" value="<?php echo htmlspecialchars($category['id_categoria']); ?>" class="btn btn-eliminar" onclick="return confirm('¿Estás seguro de que quieres eliminar esta categoría?');">
                                        <i class="bi bi-trash fs-6 icon-center"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="3" class="text-center">No hay categorías disponibles.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<script>
    // Esperamos a que el documento HTML esté completamente cargado antes de ejecutar el código
    document.addEventListener('DOMContentLoaded', function() {
        // ===== MODAL DE VER CATEGORÍA =====
        // Obtenemos una referencia al modal de ver categoría usando su ID
        var viewCategoryModal = document.getElementById('verCategoriaModal');

        // Agregamos un evento que se dispara cuando el modal está a punto de abrirse
        viewCategoryModal.addEventListener('show.bs.modal', function(event) {
            // Obtenemos el botón que activó el modal (el que tiene los datos de la categoría)
            var button = event.relatedTarget;

            // Extraemos los datos de la categoría del botón
            // Estos datos vienen de los atributos data-id y data-name del botón
            var id = button.getAttribute('data-id');
            var name = button.getAttribute('data-name');

            // Buscamos los elementos dentro del modal donde mostraremos la información
            var modalIdSpan = viewCategoryModal.querySelector('#verCategoriaId');
            var modalNameSpan = viewCategoryModal.querySelector('#verNombreCategoria');

            // Actualizamos el contenido del modal con los datos de la categoría
            modalIdSpan.textContent = id;
            modalNameSpan.textContent = name;
        });

        // ===== MODAL DE EDITAR CATEGORÍA =====
        // Obtenemos una referencia al modal de editar categoría
        var editCategoryModal = document.getElementById('editarCategoriaModal');

        // Agregamos un evento que se dispara cuando el modal está a punto de abrirse
        editCategoryModal.addEventListener('show.bs.modal', function(event) {
            // Obtenemos el botón que activó el modal
            var button = event.relatedTarget;

            // Extraemos los datos de la categoría del botón
            var id = button.getAttribute('data-id');
            var name = button.getAttribute('data-name');

            // Buscamos los campos de entrada dentro del modal
            var modalIdInput = editCategoryModal.querySelector('#editarCategoriaId');
            var modalNameInput = editCategoryModal.querySelector('#editarNombreCategoria');

            // Prellenamos los campos del formulario con los datos actuales de la categoría
            // Usamos .value en lugar de .textContent porque son campos de entrada (input)
            modalIdInput.value = id;
            modalNameInput.value = name;
        });
    });
</script>
