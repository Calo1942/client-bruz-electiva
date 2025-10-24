<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Clientes</title>
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
            // para cargar la tabla de clientes
            require_once 'components/clientDataTable.php';
            ?>
        </main>

        <!-- Scripts principales -->
        <?php echo $scripts_links; ?>
        
        
        <script type="module" src="src/assets/js/clientValidation.js"></script>
        
        <script src="src/assets/js/clientDataTable.js"></script>

        <!-- Modales -->
        <?php require_once 'components/clientEditModal.php'; ?>
        <?php require_once 'components/clientCreateModal.php'; ?>
        <?php require_once 'components/clientViewModal.php'; ?>

</body>

</html>