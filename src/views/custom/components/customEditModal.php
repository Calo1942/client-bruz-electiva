<div class="modal fade" id="editarCatalogoModal" tabindex="-1" aria-labelledby="editarCatalogoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editarCatalogoModalLabel">Editar Elemento del Catálogo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditarCatalogo" action="" method="POST" enctype="multipart/form-data"> <input type="hidden" id="editarCatalogoId" name="IdPersonalizacion"> <div class="mb-3">
                        <label for="editarDescripcionCatalogo" class="form-label">Descripción</label>
                        <textarea class="form-control" id="editarDescripcionCatalogo" name="Descripcion" rows="3" required></textarea> </div>
                    <div class="mb-3">
                        <label for="imagenActualCatalogo" class="form-label">Imagen Actual</label>
                        <img id="imagenActualCatalogo" src="" alt="Imagen Actual" class="img-fluid rounded border mb-2" style="max-width: 150px;">
                        <input type="file" class="form-control" id="editarImagenCatalogo" name="Imagen" accept="image/*"> <small class="form-text text-muted">Deja en blanco para mantener la imagen actual.</small>
                    </div>
                    <div class="mb-3">
                        <label for="editarCategoriaCatalogo" class="form-label">Categoría</label>
                        <select class="form-select" id="editarCategoriaCatalogo" name="IdCategoria" required>
                            <option value="">Seleccione una categoría</option>
                            <?php foreach ($data['categories'] as $category): ?>
                                <option value="<?php echo $category['IdCategoria']; ?>"><?php echo $category['Nombre']; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary" name="update">Guardar Cambios</button> </div>
                </form>
            </div>
        </div>
    </div>
</div>