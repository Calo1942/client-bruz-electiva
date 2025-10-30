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
<div class="container mt-4">
    <div class="table-responsive">
        <!-- Tabla con datos de categorías -->
        <table id="categoryTable" class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
                <!-- Los datos se cargarán dinámicamente via AJAX -->
=======
                <?php if (!empty($categories)): ?>
                    <?php foreach ($categories as $category): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($category['id_categoria']); ?></td>
                            <td><?php echo htmlspecialchars($category['nombre']); ?></td>
                            <td>
                                <!-- Botones para los modales -->
                                <button type="button" class="btn btn-detalle me-1"
                                    data-bs-toggle="modal" data-bs-target="#verCategoriaModal"
                                    data-id="<?php echo htmlspecialchars($category['id_categoria']); ?>"
                                    data-name="<?php echo htmlspecialchars($category['nombre']); ?>">
                                    <i class="bi bi-eye icon-center mb-0" style="font-size: 1.10rem;"></i>
                                </button>

                                <button type="button" class="btn me-1 p-1 btn-editar"
                                    data-bs-toggle="modal" data-bs-target="#editarCategoriaModal"
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
>>>>>>> 9cc7713 (feat(links): add Bootstrap and custom styles/scripts, update includes in views)
            </tbody>
        </table>
    </div>
</div>

<<<<<<< HEAD
<!-- Incluir los modales -->
<?php 
//include 'categoryViewModal.php';
//include 'categoryEditModal.php';
//include 'categoryCreateModal.php';
?>
=======
<script>
$(document).ready(function () {
    // ===== MODAL DE VER CATEGORÍA =====
    $('#verCategoriaModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // botón que disparó el modal
        var id = button.data('id');
        var name = button.data('name');

        // Setear los valores en el modal
        $(this).find('#verCategoriaId').text(id);
        $(this).find('#verNombreCategoria').text(name);
    });

    // ===== MODAL DE EDITAR CATEGORÍA =====
    $('#editarCategoriaModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var name = button.data('name');

        $(this).find('#editarCategoriaId').val(id);
        $(this).find('#editarNombreCategoria').val(name);
    });

    // ===== PATRÓN PRG: abrir modal después de un redirect =====
    <?php if (!empty($_GET['modal']) && $_GET['modal'] === 'agregarCategoriaModal'): ?>
        var modalId = '#<?php echo $_GET['modal']; ?>';
        $(modalId).modal('show');
    <?php endif; ?>
});
</script>
>>>>>>> 9cc7713 (feat(links): add Bootstrap and custom styles/scripts, update includes in views)
