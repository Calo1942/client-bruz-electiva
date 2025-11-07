<div class="modal fade" id="agregarCustomModal" tabindex="-1" aria-labelledby="agregarCustomModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- Formulario para agregar un nuevo Custom -->
            <form id="formAgregarCustom" action="" method="POST" enctype="multipart/form-data">
                <div class="modal-header">
                    <h5 class="modal-title" id="agregarCustomModalLabel">Agregar Custom</h5>
                    <!-- Botón para cerrar el modal -->
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>

                <div class="modal-body">
                    <div class="row g-3">

                        <!-- Selector para categoría del Custom -->
                        <div class="col-12">
                            <div class="form-floating">
                                <select class="form-select rounded-1" id="categoriaCustom" name="id_categoria" required>
                                    <option value="">Seleccione una categoría</option>
                                    <?php foreach ($categories as $category): ?>
                                        <option value="<?= htmlspecialchars($category['id_categoria']) ?>">
                                            <?= htmlspecialchars($category['nombre']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                                <label for="categoriaCustom">Categoría</label>
                            </div>
                        </div>

                        <!-- Campo para descripción del Custom -->
                        <div class="col-12">
                            <div class="form-floating">
                                <textarea class="form-control rounded-1" id="descripcionCustom" name="descripcion" style="height: 100px"></textarea>
                                <label for="descripcionCustom">Descripción</label>
                            </div>
                        </div>

                        <!-- Campo para imagen del Custom -->
                        <div class="col-12">
                            <label for="imagenCustom" class="form-label">Imagen del Custom (opcional)</label>
                            <input type="file" class="form-control" id="imagenCustom" name="imagen" accept="image/jpeg,image/png,image/gif,image/webp">
                            <div class="form-text">Formatos aceptados: JPEG, PNG, GIF, WebP. Tamaño máximo: 5MB</div>
                            <div class="mt-2">
                                <img id="previewImagenCustom" src="" alt="Vista previa" style="max-width: 200px; max-height: 200px; display: none; border-radius: 8px; margin-top: 10px;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <!-- Botón para cancelar y cerrar modal -->
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <!-- Botón para enviar formulario y guardar Custom -->
                    <button type="submit" name="store" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>
