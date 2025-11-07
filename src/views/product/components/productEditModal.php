<!-- Modal para editar producto -->
<div class="modal fade" id="editarProductoModal" tabindex="-1" aria-labelledby="editarProductoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- Formulario para editar un producto existente -->
            <form id="formEditarProducto" action="" method="POST" enctype="multipart/form-data">
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
                                <input type="text" class="form-control" id="editarNombreProducto" name="nombre" placeholder="Nombre" required>
                                <label for="editarNombreProducto">Nombre</label>
                            </div>
                        </div>

                        <!-- Selector para categoría del producto -->
                        <div class="col-12">
                            <div class="form-floating">
                                <select class="form-select" id="editarCategoriaProducto" name="id_categoria" required>
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
                                <textarea class="form-control" id="editarDescripcionProducto" name="descripcion" style="height: 100px"></textarea>
                                <label for="editarDescripcionProducto">Descripción</label>
                            </div>
                        </div>

                        <!-- Campo para stock del producto -->
                        <div class="col-12">
                            <div class="form-floating">
                                <input type="number" class="form-control" id="editarStockProducto" name="stock" min="0" placeholder="Stock" required>
                                <label for="editarStockProducto">Stock</label>
                            </div>
                        </div>

                        <!-- Campo para precio de venta al detalle -->
                        <div class="col-12">
                            <div class="input-group w-75 mx-auto">
                                <span class="input-group-text bg-transparent">$</span>
                                <div class="form-floating flex-grow-1">
                                    <input type="number" class="form-control" id="editarDetalProducto" name="precio_detal" step="0.01" min="0" placeholder="Precio Detal" required>
                                    <label for="editarDetalProducto">Precio al Detal</label>
                                </div>
                            </div>
                        </div>

                        <!-- Campo para precio de venta al por mayor -->
                        <div class="col-12">
                            <div class="input-group w-75 mx-auto">
                                <span class="input-group-text bg-transparent">$</span>
                                <div class="form-floating flex-grow-1">
                                    <input type="number" class="form-control" id="editarMayorProducto" name="precio_mayor" step="0.01" min="0" placeholder="Precio Mayor">
                                    <label for="editarMayorProducto">Precio al por mayor (opcional)</label>
                                </div>
                            </div>
                        </div>

                        <!-- Campo para imagen del producto -->
                        <div class="col-12">
                            <label for="editarImagenProducto" class="form-label">Imagen del Producto</label>
                            <input type="file" class="form-control" id="editarImagenProducto" name="imagen" accept="image/jpeg,image/png,image/gif,image/webp">
                            <div class="form-text">Deje vacío para mantener la imagen actual. Formatos aceptados: JPEG, PNG, GIF, WebP. Tamaño máximo: 5MB</div>
                            <div class="mt-2">
                                <div id="imagenActualProducto" style="margin-top: 10px;">
                                    <p class="text-muted small">Imagen actual:</p>
                                    <div class="image-preview-container">
                                        <img id="previewImagenActual" src="" alt="Imagen actual" style="max-width: 200px; max-height: 200px; border-radius: 8px; display: none;">
                                    </div>
                                </div>
                                <div class="image-preview-container">
                                    <img id="previewNuevaImagenProducto" src="" alt="Vista previa nueva imagen" style="max-width: 200px; max-height: 200px; display: none; border-radius: 8px; margin-top: 10px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <!-- Botón para cancelar y cerrar modal -->
                    <button type="button" class="btn btn-cancelar" data-bs-dismiss="modal">Cancelar</button>
                    <!-- Botón para enviar formulario y actualizar producto -->
                    <button type="submit" name="update" class="btn btn-guardar">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</div>
