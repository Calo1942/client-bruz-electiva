<!-- Modal para crear nueva categoría -->
<div class="modal fade" id="agregarCategoriaModal" tabindex="-1" aria-labelledby="agregarCategoriaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Encabezado del modal -->
            <div class="modal-header">
                <h4 class="modal-title" id="agregarCategoriaModalLabel">Nueva Categoría</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Cuerpo del modal con el formulario -->
            <div class="modal-body">
                <form id="formAgregarCategoria" class="needs-validation" action="" method="POST" novalidate>
                    <div class="mb-3">
                        <label for="nombreCategoria" class="form-label texto">Nombre de la Categoría:</label>
                        <input type="text" class="form-control" id="nombreCategoria" name="nombre"required>
                        <div class="invalid-feedback" id="mensajeError">Solo se permiten letras y números, sin caracteres especiales.</div>
                    </div>
                    <!-- Botones de acción -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-cancelar" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" name="store" class="btn btn-guardar">Guardar</button>
                    </div>
                   
                </form>
            </div>
        </div>
    </div>
</div>