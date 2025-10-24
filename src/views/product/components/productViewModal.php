<div class="modal fade" id="verProductoModal" tabindex="-1" aria-labelledby="verProductoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content border-0 rounded-3 shadow">
            <!-- Header del modal con título y botón para cerrar -->
            <div class="modal-header border-bottom">
                <h5 class="modal-title fw-bold" id="verProductoModalLabel">Detalles del Producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Cuerpo del modal que muestra la información del producto -->
            <div class="modal-body">
                <div class="row g-4">
                    <!-- Columna con los detalles del producto -->
                    <div class="col-12">
                        <!-- Nombre del producto -->
                        <h2 class="fs-3 fw-bold mb-4" id="verNombreProducto"></h2>

                        <!-- Sección con detalles adicionales -->
                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="card border-0 bg-light">
                                    <div class="card-body">
                                        <p class="mb-1 text-muted fw-bold">Categoría:</p>
                                        <p class="mb-3" id="verCategoriaProducto"></p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="card border-0 bg-light">
                                    <div class="card-body">
                                        <p class="mb-1 text-muted fw-bold">Precio Detal:</p>
                                        <h4 class="fw-bold text-dark" id="verPrecioDetalProducto"></h4>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="card border-0 bg-light">
                                    <div class="card-body">
                                        <p class="mb-1 text-muted fw-bold">Precio Mayor:</p>
                                        <h4 class="fw-bold text-dark" id="verPrecioMayorProducto"></h4>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-12">
                                <div class="card border-0 bg-light">
                                    <div class="card-body">
                                        <p class="mb-1 text-muted fw-bold">Descripción:</p>
                                        <p class="mb-0" id="verDescripcionProducto"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer del modal con botón para cerrar -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
