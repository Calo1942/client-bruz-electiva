<!-- Modal para editar talla -->
<div class="modal fade" id="editarTallaModal" tabindex="-1" aria-labelledby="editarTallaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Encabezado del modal -->
            <div class="modal-header">
                <h5 class="modal-title" id="editarTallaModalLabel">Editar Talla</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Cuerpo del modal con el formulario -->
            <div class="modal-body">
                <form id="formEditarTalla" action="" method="POST">
                    <input type="hidden" id="editarTallaId" name="IdTalla">
                    <div class="mb-3">
                        <label for="editarNombreTalla" class="form-label">Nombre de la Talla</label>
                        <input type="text" class="form-control" id="editarNombreTalla" name="Nombre" required>
                    </div>
                    <!-- Botones de acción -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" name="update" class="btn btn-primary">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>