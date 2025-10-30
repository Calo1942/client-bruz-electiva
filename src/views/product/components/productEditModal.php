<!-- Modal para editar producto -->
<div class="modal fade" id="editarProductoModal" tabindex="-1" aria-labelledby="editarProductoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- Formulario para editar un producto existente -->
            <form action="" method="POST">
                <div class="modal-header">
                    <h5 class="modal-title" id="editarProductoModalLabel">Editar Producto</h5>
                    <!-- Botón para cerrar el modal -->
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>

                <div class="modal-body">
                    <div class="row g-3">
                        <!-- Campo oculto para el ID del producto -->
                        <input type="hidden" id="editarProductoId" name="id_producto">
                        
                        <!-- Campo para nombre del producto -->
                        <div class="col-12">
                            <div class="form-floating">
                                <input type="text" class="form-control rounded-1" id="editarNombreProducto" name="nombre" placeholder="Nombre" required>
                                <label for="editarNombreProducto">Nombre</label>
                            </div>
                        </div>

                        <!-- Selector para categoría del producto -->
                        <div class="col-12">
                            <div class="form-floating">
                                <select class="form-select rounded-1" id="editarCategoriaProducto" name="id_categoria" required>
                                    <option value="">Seleccione una categoría</option>
                                    <?php foreach ($categories as $category): ?>
                                        <option value="<?= htmlspecialchars($category['id_categoria']) ?>">
                                            <?= htmlspecialchars($category['nombre']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                                <label for="editarCategoriaProducto">Categoría</label>
                            </div>
                        </div>

                        <!-- Campo para descripción del producto -->
                        <div class="col-12">
                            <div class="form-floating">
                                <textarea class="form-control rounded-1" id="editarDescripcionProducto" name="descripcion" style="height: 100px"></textarea>
                                <label for="editarDescripcionProducto">Descripción</label>
                            </div>
                        </div>

                        <!-- Campo para precio de venta al detalle -->
                        <div class="col-12">
                            <div class="input-group border-dark rounded-1 w-75 mx-auto">
                                <span class="input-group-text bg-transparent rounded-start">$</span>
                                <div class="form-floating flex-grow-1">
                                    <input type="number" class="form-control rounded-0" id="editarDetalProducto" name="precio_detal" step="0.01" min="0" placeholder="Precio Detal" required>
                                    <label for="editarDetalProducto">Precio al Detal</label>
                                </div>
                            </div>
                        </div>

                        <!-- Campo para precio de venta al por mayor -->
                        <div class="col-12">
                            <div class="input-group border-dark rounded-1 w-75 mx-auto">
                                <span class="input-group-text bg-transparent rounded-start">$</span>
                                <div class="form-floating flex-grow-1">
                                    <input type="number" class="form-control rounded-0" id="editarMayorProducto" name="precio_mayor" step="0.01" min="0" placeholder="Precio Mayor">
                                    <label for="editarMayorProducto">Precio al por mayor (opcional)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <!-- Botón para cancelar y cerrar modal -->
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <!-- Botón para enviar formulario y actualizar producto -->
                    <button type="submit" name="update" class="btn btn-primary">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</div>
