<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Productos</title>
    <?php
    // Incluye el archivo que contiene la variable con los links

    include 'src/assets/linksFront.php';
    // Imprime la variable dentro de la etiqueta <head>
    echo $css_links;
    ?>
</head>

<body>
    <!-- Barra lateral -->
    <div class="p-0 bg-dark sidebar">
        <?php require_once __DIR__ . '/../components/sidebar.php'; ?>
    </div>

    <!-- Contenedor principal -->
    <div class="flex-grow-1 d-flex flex-column">

        <!-- Contenido del navbar -->
        <?php require_once __DIR__ . '/../components/navbar.php'; ?>

        <!-- Contenido principal -->
        <main class="flex-grow-1 p-4 bg-light">
            <?php
                // para cargar la tabla de productos
                require_once 'components/productDataTable.php';
            ?>
        </main>

        <!-- Scripts principales -->
        <?php echo $scripts_links; ?>
        
        <script type="module" src="src/assets/js/product/productValidation.js"></script>
        
        <script src="src/assets/js/product/productDataTable.js"></script>

        <!-- Modales -->
        <?php require_once 'components/productCreateModal.php'; ?>
        <?php require_once 'components/productEditModal.php'; ?>
        <?php require_once 'components/productViewModal.php'; ?>
    </div>

</body>

</html>