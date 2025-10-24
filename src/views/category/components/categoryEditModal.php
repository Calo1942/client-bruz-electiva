<!-- Modal para editar categoría -->
<div class="modal fade" id="editarCategoriaModal" tabindex="-1" aria-labelledby="editarCategoriaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Encabezado del modal -->
            <div class="modal-header">
                <h4 class="modal-title" id="editarCategoriaModalLabel">Editar Categoría</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Cuerpo del modal con el formulario -->
            <div class="modal-body">
                <form id="formEditarCategoria" action="" method="POST">
                    <input type="hidden" id="editarCategoriaId" name="id_categoria">
                    <div class="mb-3">
                        <label for="editarNombreCategoria" class="form-label texto">Nombre de la Categoría:</label>
                        <input type="text" class="form-control" id="editarNombreCategoria" name="nombre" required>
                    </div>
                    <!-- Botones de acción -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-cancelar" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" name="update" class="btn btn-guardar">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>