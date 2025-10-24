<!-- Modal para Editar Inventario -->
<div class="modal fade" id="editarInventarioModal" tabindex="-1" aria-labelledby="editarInventarioModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editarInventarioModalLabel">Editar Registro de Inventario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditarInventario" action="" method="POST">
                    <!-- Campo ID: solo lectura para evitar cambios en el identificador -->
                    <div class="mb-3">
                        <label for="editarInventarioId" class="form-label">ID Inventario *</label>
                        <input type="text" class="form-control" id="editarInventarioId" name="IdInventario" required readonly>
                    </div>
                    <!-- Campo Producto editable -->
                    <div class="mb-3">
                        <label for="editarProductoInventario" class="form-label">Producto *</label>
                        <select class="form-select" id="editarProductoInventario" name="IdProducto" required>
                            <option value="">Seleccione un producto</option>
                            <?php 
                            // Aquí deberías cargar los productos desde la base de datos
                            ?>
                        </select>
                    </div>
                    <!-- Campo Talla editable -->
                    <div class="mb-3">
                        <label for="editarTallaInventario" class="form-label">Talla *</label>
                        <select class="form-select" id="editarTallaInventario" name="IdTalla" required>
                            <option value="">Seleccione una talla</option>
                            <?php 
                            // Aquí deberías cargar las tallas desde la base de datos
                            ?>
                        </select>
                    </div>
                    <!-- Campo Color editable -->
                    <div class="mb-3">
                        <label for="editarColorInventario" class="form-label">Color *</label>
                        <input type="text" class="form-control" id="editarColorInventario" name="Color" required>
                    </div>
                    <!-- Campo Stock editable -->
                    <div class="mb-3">
                        <label for="editarStockInventario" class="form-label">Stock *</label>
                        <input type="number" class="form-control" id="editarStockInventario" name="Stock" 
                               required min="0">
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
</div> 