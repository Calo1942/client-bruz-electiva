<div class="d-flex align-items-center justify-content-between mb-3">
    <!-- Título y botón para abrir modal de agregar categoría -->
    <h2 class="me-2 mb-0 titulo">Categorías</h2>
    <button class="btn btn-agregar" data-bs-toggle="modal" data-bs-target="#agregarCategoriaModal">
        Agregar <i class="bi bi-plus-lg icon-center"></i>
    </button>
</div>
<div class="skeleton-table mb-3">
    <div class="skeleton-header">
        <div class="skeleton-header-cell"></div>
        <div class="skeleton-header-cell"></div>
        <div class="skeleton-header-cell"></div>
    </div>
    <div class="skeleton-body">
        <?php for ($i = 0; $i < 5; $i++): ?>
            <div class="skeleton-row">
                <div class="skeleton-cell"></div>
                <div class="skeleton-cell"></div>
                <div class="skeleton-cell"></div>
            </div>
        <?php endfor; ?>
    </div>
</div>
<div class="table-responsive">
    <!-- Tabla compatible con DataTable -->
    <table id="categoryTable" class="table table-striped table-hover">
        <thead class="table-dark">
            <tr>
                <!-- Encabezados de la tabla -->
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <!-- Los datos se cargarán dinámicamente via AJAX -->
        </tbody>
    </table>
</div>