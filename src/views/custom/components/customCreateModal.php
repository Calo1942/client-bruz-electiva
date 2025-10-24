<div class="modal fade" id="agregarCatalogoModal" tabindex="-1" aria-labelledby="agregarCatalogoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="agregarCatalogoModalLabel">Agregar Nuevo Elemento al Catálogo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formAgregarCatalogo" action="" method="POST" enctype="multipart/form-data"> <div class="mb-3">
                        <label for="descripcionCatalogo" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcionCatalogo" name="Descripcion" rows="3" required></textarea> </div>
                    <div class="mb-3">
                        <label for="imagenCatalogo" class="form-label">Imagen</label>
                        <input type="file" class="form-control" id="imagenCatalogo" name="Imagen" accept="image/*"> </div>
                    <div class="mb-3">
                        <label for="categoriaCatalogo" class="form-label">Categoría</label>
                        <select class="form-select" id="categoriaCatalogo" name="id_categoria" required>
                            <option value="">Seleccione una categoría</option>
                            <?php foreach ($data['categories'] as $category): ?>
                                <option value="<?php echo $category['id_categoria']; ?>"><?php echo $category['Nombre']; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary" name="store">Guardar Elemento</button> </div>
                </form>
            </div>
        </div>
    </div>
</div>