<div class="d-flex align-items-center mb-3">
    <h2 class="me-2 mb-0 titulo">Productos Personalizados</h2>
    <button class="btn btn-agregar" data-bs-toggle="modal" data-bs-target="#agregarCatalogoModal">
        <i class="bi bi-plus-lg icon-center"></i>
    </button>
</div>

<div class="table-responsive">
    <table class="table table-hover align-middle">
        <thead class="table-dark">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Imagen</th>
                <th scope="col">Descripción</th>
                <th scope="col">Categoría</th>
                <th scope="col" class="text-end">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <!-- Si hay productos personalizados, recorremos cada uno para mostrarlo -->
            <?php if (!empty($data['customItems'])): ?>
                <?php foreach ($data['customItems'] as $customItem): ?>
                    <tr>
                        <td><?php echo $customItem['IdPersonalizacion']; ?></td>
                        <td>
                            <!-- Muestra la imagen del producto personalizado -->
                            <img src="<?php echo htmlspecialchars($customItem['Imagen']); ?>" alt="Imagen de Personalización" class="img-fluid rounded border" style="width: 50px; height: 50px; object-fit: cover;">
                        </td>
                        <td>
                            <!-- Muestra la descripción del producto personalizado -->
                            <p class="text-muted mb-0"><?php echo htmlspecialchars($customItem['Descripcion']); ?></p>
                        </td>
                        <td>
                            <?php
                                // Busca el nombre de la categoría que corresponde al producto
                                $categoryName = 'N/A';
                                foreach ($data['categories'] as $category) {
                                    if ($category['IdCategoria'] == $customItem['IdCategoria']) {
                                        $categoryName = htmlspecialchars($category['Nombre']);
                                        break;
                                    }
                                }
                                echo $categoryName; // Muestra el nombre de la categoría
                            ?>
                        </td>
                        <td class="text-end">
                            <!-- Botón para ver detalles del producto personalizado en un modal -->
                            <form action="" method="POST" style="display:inline;">
                                <input type="hidden" name="show" value="<?php echo $customItem['IdPersonalizacion']; ?>">
                                <button type="button" class="btn btn-ver me-1"
                                        data-bs-toggle="modal" data-bs-target="#verCatalogoModal"
                                        data-id="<?php echo $customItem['IdPersonalizacion']; ?>"
                                        data-description="<?php echo htmlspecialchars($customItem['Descripcion']); ?>"
                                        data-image="<?php echo htmlspecialchars($customItem['Imagen']); ?>"
                                        data-category-id="<?php echo htmlspecialchars($customItem['id_categoria']); ?>">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </form>

                            <!-- Botón para editar el producto personalizado en un modal -->
                            <form action="" method="POST" style="display:inline;">
                                <input type="hidden" name="show" value="<?php echo $customItem['IdPersonalizacion']; ?>">
                                <button type="button" class="btn btn-editar me-1"
                                        data-bs-toggle="modal" data-bs-target="#editarCatalogoModal"
                                        data-id="<?php echo $customItem['IdPersonalizacion']; ?>"
                                        data-description="<?php echo htmlspecialchars($customItem['Descripcion']); ?>"
                                        data-image="<?php echo htmlspecialchars($customItem['Imagen']); ?>"
                                        data-category-id="<?php echo htmlspecialchars($customItem['id_categoria']); ?>">
                                    <i class="bi bi-pencil-square icon-center"></i>
                                </button>
                            </form>

                            <!-- Botón para eliminar el producto personalizado con confirmación -->
                            <form action="" method="POST" style="display:inline;" onsubmit="return confirm('¿Está seguro de que desea eliminar este elemento personalizado?');">
                                <input type="hidden" name="delete" value="<?php echo $customItem['IdPersonalizacion']; ?>">
                                <button type="submit" class="btn btn-eliminar"><i class="bi bi-trash icon-center"></i></button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <!-- Si no hay productos personalizados, muestra mensaje -->
            <?php else: ?>
                <tr>
                    <td colspan="5" class="text-center">No hay productos personalizados disponibles.</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Agrega eventos a los botones para ver detalles del producto personalizado
        var viewCustomButtons = document.querySelectorAll('.view-custom-btn');
        viewCustomButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Obtiene los datos desde atributos data- del botón
                var id = this.getAttribute('data-id');
                var description = this.getAttribute('data-description');
                var image = this.getAttribute('data-image');
                var categoryId = this.getAttribute('data-category-id');

                // Actualiza el contenido del modal con los datos del producto seleccionado
                document.getElementById('verCatalogoId').textContent = id;
                document.getElementById('verDescripcionCatalogo').textContent = description;
                document.getElementById('verImagenCatalogo').src = image;
                document.getElementById('verCategoriaCatalogo').textContent = getCategoryName(categoryId);
            });
        });

        // Agrega eventos a los botones para editar el producto personalizado
        var editCustomButtons = document.querySelectorAll('.edit-custom-btn');
        editCustomButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Obtiene los datos desde atributos data- del botón
                var id = this.getAttribute('data-id');
                var description = this.getAttribute('data-description');
                var image = this.getAttribute('data-image');
                var categoryId = this.getAttribute('data-category-id');

                // Prellena los campos del formulario de edición con los datos existentes
                document.getElementById('editarCatalogoId').value = id;
                document.getElementById('editarDescripcionCatalogo').value = description;
                document.getElementById('imagenActualCatalogo').src = image;
                document.getElementById('editarCategoriaCatalogo').value = categoryId;
            });
        });

        // Función para obtener el nombre de la categoría según el ID de categoría
        function getCategoryName(categoryId) {
            // Convierte el arreglo de categorías PHP a objeto JS
            const categories = <?php echo json_encode($data['categories']); ?>;
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].IdCategoria == categoryId) {
                    return categories[i].Nombre;
                }
            }
            return 'Categoría Desconocida'; // Retorna texto por defecto si no encuentra la categoría
        }
    });
</script>
