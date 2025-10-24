<div class="d-flex  align-items-center mb-3">
    <h2 class="me-2 mb-0 titulo">Productos</h2>
    <button class="btn btn-agregar" data-bs-toggle="modal" data-bs-target="#agregarProductoModal">
        <i class="bi icon-center bi-plus-lg"></i>
    </button>
</div>

<div class="container mt-4">
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <!-- Encabezados de la tabla -->
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio al Detal</th>
                    <th>Precio al Mayor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($products)): ?>
                    <!-- Recorremos el arreglo de productos si no está vacío -->
                    <?php foreach ($products as $product): ?>
                        <tr>
                            <!-- Datos de cada producto -->
                            <td><?php echo htmlspecialchars($product['id_producto']); ?></td>
                            <td><?php echo htmlspecialchars($product['nombre']); ?></td>
                            <td><?php echo htmlspecialchars($product['nombre_categoria'] ?? 'Sin categoría'); ?></td>
                            <td>$<?php echo htmlspecialchars($product['precio_detal']); ?></td>
                            <td>$<?php echo htmlspecialchars($product['precio_mayor'] ?? 'N/A'); ?></td>
                            <td>
                                <!-- Botón para ver detalles del producto (abre modal) -->
                                <button type="button" class="btn btn-detalle me-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#verProductoModal"
                                    data-id="<?php echo htmlspecialchars($product['id_producto']); ?>"
                                    data-name="<?php echo htmlspecialchars($product['nombre']); ?>"
                                    data-descripcion="<?php echo htmlspecialchars($product['descripcion'] ?? ''); ?>"
                                    data-detal="<?php echo htmlspecialchars($product['precio_detal']); ?>"
                                    data-mayor="<?php echo htmlspecialchars($product['precio_mayor'] ?? ''); ?>"
                                    data-categoria="<?php echo htmlspecialchars($product['nombre_categoria'] ?? 'Sin categoría'); ?>">
                                    <i class="bi bi-eye icon-center"></i>
                                </button>

                                <!-- Botón para editar producto (abre modal) -->
                                <button type="button" class="btn me-1 p-1 btn-editar"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editarProductoModal"
                                    data-id="<?php echo htmlspecialchars($product['id_producto']); ?>"
                                    data-name="<?php echo htmlspecialchars($product['nombre']); ?>"
                                    data-descripcion="<?php echo htmlspecialchars($product['descripcion'] ?? ''); ?>"
                                    data-detal="<?php echo htmlspecialchars($product['precio_detal']); ?>"
                                    data-mayor="<?php echo htmlspecialchars($product['precio_mayor'] ?? ''); ?>"
                                    data-categoria="<?php echo htmlspecialchars($product['id_categoria']); ?>">
                                    <i class="bi bi-pencil-square icon-center"></i>
                                </button>

                                <!-- Formulario para eliminar producto -->
                                <form action="" method="POST" class="d-inline">
                                    <button type="submit" name="delete" value="<?php echo htmlspecialchars($product['id_producto']); ?>"
                                        class="btn btn-eliminar"
                                        onclick="return confirm('¿Estás seguro de que quieres eliminar este producto?');">
                                        <i class="bi bi-trash icon-center"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <!-- Mensaje cuando no hay productos -->
                    <tr>
                        <td colspan="6" class="text-center">No hay productos disponibles.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>


<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Modal de Ver
        var viewProductModal = document.getElementById('verProductoModal');
        if (viewProductModal) {
            viewProductModal.addEventListener('show.bs.modal', function(event) {
                var button = event.relatedTarget;
                var nombre = button.getAttribute('data-name');
                var descripcion = button.getAttribute('data-descripcion');
                var detal = button.getAttribute('data-detal');
                var mayor = button.getAttribute('data-mayor');
                var categoria = button.getAttribute('data-categoria');

                // Actualizar elementos del modal si existen
                var verNombreElement = document.getElementById('verNombreProducto');
                var verDescripcionElement = document.getElementById('verDescripcionProducto');
                var verDetalElement = document.getElementById('verPrecioDetalProducto');
                var verMayorElement = document.getElementById('verPrecioMayorProducto');
                var verCategoriaElement = document.getElementById('verCategoriaProducto');

                if (verNombreElement) verNombreElement.textContent = nombre;
                if (verDescripcionElement) verDescripcionElement.textContent = descripcion || 'Sin descripción';
                if (verDetalElement) verDetalElement.textContent = '$' + detal;
                if (verMayorElement) verMayorElement.textContent = mayor ? '$' + mayor : 'N/A';
                if (verCategoriaElement) verCategoriaElement.textContent = categoria;
            });
        }

        // Modal de Editar
        var editProductModal = document.getElementById('editarProductoModal');
        if (editProductModal) {
            editProductModal.addEventListener('show.bs.modal', function(event) {
                var button = event.relatedTarget;
                var id = button.getAttribute('data-id');
                var nombre = button.getAttribute('data-name');
                var descripcion = button.getAttribute('data-descripcion');
                var detal = button.getAttribute('data-detal');
                var mayor = button.getAttribute('data-mayor');
                var categoria = button.getAttribute('data-categoria');
               
                // Rellenamos los campos del formulario si existen
                var editarIdElement = document.getElementById('editarProductoId');
                var editarNombreElement = document.getElementById('editarNombreProducto');
                var editarDescripcionElement = document.getElementById('editarDescripcionProducto');
                var editarDetalElement = document.getElementById('editarDetalProducto');
                var editarMayorElement = document.getElementById('editarMayorProducto');
                var editarCategoriaElement = document.getElementById('editarCategoriaProducto');

                if (editarIdElement) editarIdElement.value = id;
                if (editarNombreElement) editarNombreElement.value = nombre;
                if (editarDescripcionElement) editarDescripcionElement.value = descripcion || '';
                if (editarDetalElement) editarDetalElement.value = detal;
                if (editarMayorElement) editarMayorElement.value = mayor || '';
                if (editarCategoriaElement) editarCategoriaElement.value = categoria;
            });
        }
    });
</script>