<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>customos</title>
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
                // Para cargar la tabla
                require_once 'components/customDataTable.php';
            ?>
        </main>

        <!-- Scripts principales -->
        <?php echo $scripts_links; ?>
        
        <script type="module" src="src/assets/js/custom/customValidation.js"></script>
        
        <script src="src/assets/js/custom/customDataTable.js"></script>

        <!-- Modales -->
        <?php require_once 'components/customCreateModal.php'; ?>
        <?php require_once 'components/customEditModal.php'; ?>
        <?php require_once 'components/customViewModal.php'; ?>
    </div>

</body>

</html>