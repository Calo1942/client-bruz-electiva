<div class="d-flex align-items-center mb-3">
    <!-- Título y botón para abrir modal de agregar inventario -->
    <h2 class="me-2 mb-0 titulo">Variantes</h2>
    <button class="btn btn-agregar" data-bs-toggle="modal" data-bs-target="#agregarInventarioModal">
        <i class="bi bi-plus-lg icon-center"></i>
</button>
</div>
<div class="container mt-4">
    <div class="table-responsive">
        <!-- Tabla con datos de inventario -->
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <!-- Encabezados de la tabla -->
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Talla</th>
                    <th>Color</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($inventario)): ?>
                    <?php foreach ($inventario as $item): ?>
                        <tr>
                            <!-- Datos del inventario con protección contra XSS -->
                            <td><?php echo htmlspecialchars($item['IdVariante']); ?></td>
                            <td><?php echo htmlspecialchars($item['NombreProducto'] ?? 'Sin producto'); ?></td>
                            <td><?php echo htmlspecialchars($item['NombreTalla'] ?? 'Sin talla'); ?></td>
                            <td><?php echo htmlspecialchars($item['Color'] ?? 'Sin color'); ?></td>
                            <td>
                                <span class="badge <?php echo $item['Stock'] < 10 ? 'bg-danger' : ($item['Stock'] < 50 ? 'bg-warning' : 'bg-success'); ?>">
                                    <?php echo htmlspecialchars($item['Stock']); ?>
                                </span>
                    </td>
                            <td>
                                <!-- Botón para ver detalles, abre modal con datos del inventario -->
                                <button type="button" class="btn btn-ver me-1"
                                    data-bs-toggle="modal" data-bs-target="#verInventarioModal"
                                    data-id="<?php echo htmlspecialchars($item['IdVariante']); ?>"
                                    data-producto="<?php echo htmlspecialchars($item['NombreProducto'] ?? ''); ?>"
                                    data-talla="<?php echo htmlspecialchars($item['NombreTalla'] ?? ''); ?>"
                                    data-color="<?php echo htmlspecialchars($item['Color'] ?? ''); ?>"
                                    data-stock="<?php echo htmlspecialchars($item['Stock']); ?>">
                            <i class="bi bi-eye icon-center"></i>
                        </button>

                                <!-- Botón para editar inventario, abre modal con formulario -->
                                <button type="button" class="btn btn-editar me-1"
                                    data-bs-toggle="modal" data-bs-target="#editarInventarioModal"
                                    data-id="<?php echo htmlspecialchars($item['IdVariante']); ?>"
                                    data-producto="<?php echo htmlspecialchars($item['IdProducto'] ?? ''); ?>"
                                    data-talla="<?php echo htmlspecialchars($item['IdTalla'] ?? ''); ?>"
                                    data-color="<?php echo htmlspecialchars($item['Color'] ?? ''); ?>"
                                    data-stock="<?php echo htmlspecialchars($item['Stock']); ?>">
                            <i class="bi bi-pencil-square icon-center"></i>
                        </button>

                                <!-- Formulario para eliminar inventario con confirmación -->
                                <form action="" method="POST" class="d-inline">
                                    <button type="submit" name="delete" value="<?php echo htmlspecialchars($item['IdVariante']); ?>" class="btn btn-eliminar" onclick="return confirm('¿Estás seguro de que quieres eliminar este registro de inventario?');">
                            <i class="bi bi-trash icon-center"></i>
                        </button>
                                </form>
                    </td>
                </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <!-- Mensaje si no hay inventario disponible -->
                    <tr>
                        <td colspan="6" class="text-center">No hay registros de inventario disponibles.</td>
                </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Evento para llenar modal de visualización con datos del inventario
        var viewInventoryModal = document.getElementById('verInventarioModal');
        viewInventoryModal.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var id = button.getAttribute('data-id');
            var producto = button.getAttribute('data-producto');
            var talla = button.getAttribute('data-talla');
            var color = button.getAttribute('data-color');
            var stock = button.getAttribute('data-stock');

            // Asigna los datos a los elementos del modal
            viewInventoryModal.querySelector('#verInventarioId').textContent = id;
            viewInventoryModal.querySelector('#verProductoInventario').textContent = producto;
            viewInventoryModal.querySelector('#verTallaInventario').textContent = talla;
            viewInventoryModal.querySelector('#verColorInventario').textContent = color;
            viewInventoryModal.querySelector('#verStockInventario').textContent = stock;
        });

        // Evento para llenar modal de edición con datos del inventario
        var editInventoryModal = document.getElementById('editarInventarioModal');
        editInventoryModal.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var id = button.getAttribute('data-id');
            var producto = button.getAttribute('data-producto');
            var talla = button.getAttribute('data-talla');
            var color = button.getAttribute('data-color');
            var stock = button.getAttribute('data-stock');

            // Asigna los valores a los campos del formulario en el modal
            editInventoryModal.querySelector('#editarInventarioId').value = id;
            editInventoryModal.querySelector('#editarProductoInventario').value = producto;
            editInventoryModal.querySelector('#editarTallaInventario').value = talla;
            editInventoryModal.querySelector('#editarColorInventario').value = color;
            editInventoryModal.querySelector('#editarStockInventario').value = stock;
        });
    });
</script>