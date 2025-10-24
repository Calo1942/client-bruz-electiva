<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>
    <!-- Bootstrap CSS -->
    <?php
    // Incluye el archivo que contiene la variable con los links
    include 'src/config/components/Front/linksFront.php';
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
               // Aquí puedes agregar contenido dinámico para el dashboard
               // Por ejemplo, estadísticas, gráficos, etc.
            ?>
        </main>

        <!-- Scripts Bootstrap -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <!-- para javascript <script src="../../assets/js/script.js"> </script> -->

        <!-- Modales -->

</body>

</html>