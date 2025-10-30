<!-- Modal para ver detalles de categoría -->
<div class="modal fade" id="verCategoriaModal" tabindex="-1" aria-labelledby="verCategoriaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Encabezado del modal -->
            <div class="modal-header">
                <h4 class="modal-title" id="verCategoriaModalLabel">Detalles de la Categoría</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Cuerpo del modal con la información -->
            <div class="modal-body">
                <p><strong>ID de Categoría:</strong> <span id="verCategoriaId"></span></p>
                <p><strong>Nombre:</strong> <span id="verNombreCategoria"></span></p>
            </div>
            <!-- Botón de cerrar -->
            <div class="modal-footer">
                <button type="button" class="btn btn-cancelar" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>