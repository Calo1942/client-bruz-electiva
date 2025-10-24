<!-- Modal para Agregar Inventario -->
<div class="modal fade" id="agregarInventarioModal" tabindex="-1" aria-labelledby="agregarInventarioModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="agregarInventarioModalLabel">Agregar Nuevo Registro de Inventario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formAgregarInventario" action="" method="POST">
                    <div class="mb-3">
                        <label for="productoInventario" class="form-label">Producto *</label>
                        <select class="form-select" id="productoInventario" name="IdProducto" required>
                            <option value="">Seleccione un producto</option>
                            <?php if (!empty($productos)): ?>
                                <?php foreach ($productos as $producto): ?>
                                    <option value="<?php echo $producto['IdProducto']; ?>">
                                        <?php echo htmlspecialchars($producto['Nombre']); ?>
                                    </option>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="tallaInventario" class="form-label">Talla *</label>
                        <select class="form-select" id="tallaInventario" name="IdTalla" required>
                            <option value="">Seleccione una talla</option>
                            <?php if (!empty($tallas)): ?>
                                <?php foreach ($tallas as $talla): ?>
                                    <option value="<?php echo $talla['IdTalla']; ?>">
                                        <?php echo htmlspecialchars($talla['Nombre']); ?>
                                    </option>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="colorInventario" class="form-label">Color *</label>
                        <input type="text" class="form-control" id="colorInventario" name="Color" required>
                    </div>
                    <div class="mb-3">
                        <label for="stockInventario" class="form-label">Stock *</label>
                        <input type="number" class="form-control" id="stockInventario" name="Stock" 
                               required min="0" value="0">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary" name="store">Guardar Inventario</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 