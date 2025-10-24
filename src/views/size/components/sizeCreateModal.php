<!-- Modal para crear nueva talla -->
<div class="modal fade" id="agregarTallaModal" tabindex="-1" aria-labelledby="agregarTallaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Encabezado del modal -->
            <div class="modal-header">
                <h5 class="modal-title" id="agregarTallaModalLabel">Agregar Nueva Talla</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Cuerpo del modal con el formulario -->
            <div class="modal-body">
                <form id="formAgregarTalla" action="" method="POST">
                    <div class="mb-3">
                        <label for="nombreTalla" class="form-label">Nombre de la Talla</label>
                        <input type="text" class="form-control" id="nombreTalla" name="Nombre" required>
                    </div>
                    <!-- Botones de acción -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" name="store" class="btn btn-primary">Guardar Talla</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>