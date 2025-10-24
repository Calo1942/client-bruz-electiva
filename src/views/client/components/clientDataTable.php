<div class="d-flex align-items-center mb-3">
    <!-- Título y botón para abrir modal de agregar cliente -->
    <h2 class="me-2 mb-0 titulo">Clientes</h2>
    <button class="btn btn-agregar" data-bs-toggle="modal" data-bs-target="#agregarClienteModal">
        <i class="bi bi-plus-lg icon-center"></i>
    </button>
</div>
<div class="table-responsive">
    <!-- Tabla compatible con DataTable -->
    <table id="clientTable" class="table table-striped table-hover">
        <thead class="table-dark">
            <tr>
                <!-- Encabezados de la tabla -->
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <!-- Los datos se cargarán dinámicamente via AJAX -->
        </tbody>
    </table>
</div>
