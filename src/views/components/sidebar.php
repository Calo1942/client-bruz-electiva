<?php
// Obtiene la URL actual o asigna 'dashboard' por defecto
$currentUrl = isset($_GET['url']) ? $_GET['url'] : 'dashboard';

// Variable booleana para saber si estamos en páginas relacionadas con inventario
$isInventory = ($currentUrl == 'product' || $currentUrl == 'category' || $currentUrl == 'inventory' || $currentUrl == 'size');
?>
<div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100" style="width: 280px;">
    <!-- Logo o título del sidebar -->
    <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" >
        <!-- Aquí podrías poner un ícono o div para color rojo -->
        <span class="brand-title ms-2">BRUZTEXTIL</span>
    </a>
    <hr>
    <!-- Menú principal de navegación -->
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <!-- Link a Dashboard, agrega clase 'active' si es la página actual -->
            <a href="?url=client" class="nav-link text-white " aria-current="page">
                <i class="bi bi-house me-2"></i> <!-- Icono de casa para Dashboard -->
                Inicio
            </a>
        </li>

        <li>
            <a href="?url=product" class="nav-link text-white <?php if($currentUrl == 'product') echo 'active'; ?>">
                <i class="bi bi-box me-2"></i>
                Productos
            </a>
        </li>
        
        <li>
            <a href="?url=category" class="nav-link text-white <?php if($currentUrl == 'category') echo 'active'; ?>">
                <i class="bi bi-tags me-2"></i>
                Categoria
            </a>
        </li>

        <li>
            <!-- Link a Clientes, activa si estamos en 'client' -->
            <a href="?url=client" class="nav-link text-white <?php if($currentUrl == 'client') echo 'active'; ?>">
                <i class="bi bi-person-lines-fill me-2"></i> <!-- Icono clientes -->
                Clientes
            </a>
        </li>
        
    </ul>
    <hr>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el enlace de inventario
    const inventoryLink = document.querySelector('a[href="?url=inventory"]');
    
    if (inventoryLink) {
        inventoryLink.addEventListener('click', function(e) {
            // Prevenir el comportamiento por defecto
            e.preventDefault();
            
            // Obtener el submenu
            const submenu = document.getElementById('inventario-submenu');
            
            // Alternar el estado del submenu
            if (submenu) {
                const bsCollapse = new bootstrap.Collapse(submenu, {
                    toggle: true
                });
            }
            
            // Redirigir a la página de inventario después de un pequeño delay
            setTimeout(function() {
                window.location.href = '?url=inventory';
            }, 100);
        });
    }
});
</script>
