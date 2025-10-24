<?php

namespace BruzDeporte\Controllers;

use BruzDeporte\Models\CategoryModel; 

// Controlador para gestionar categorías
$model = new CategoryModel();
$action = null;

// Determina la acción a realizar basándose en las solicitudes POST recibidas.
if (isset($_POST['store'])) {
    $action = 'store'; 
} elseif (isset($_POST['update'])) { 
    $action = 'update'; 
} elseif (isset($_POST['delete'])) { 
    $action = 'delete'; 
} elseif (isset($_POST['show'])) { 
    $action = 'show'; 
}

switch ($action) {
    case 'store': 
        $data = [
            'nombre' => $_POST['nombre'] ?? ''
        ];
        $response = $model->store($data); 
        break;
    case 'update': 
        $idCategoria = $_POST['id_categoria'] ?? null; 
        if ($idCategoria) { 
            $data = [
                'nombre' => $_POST['nombre'] ?? '' 
            ];
            $response = $model->update($idCategoria, $data); 
        }
        break;
    case 'delete': 
        $idCategoria = $_POST['delete'] ?? null; 
        if ($idCategoria) { 
            $response = $model->delete($idCategoria); 
        }
        break;
    // Muestra detalles de una categoría específica
    case 'show':
        $idCategoria = $_POST['show']; 
        $category = $model->find($idCategoria); 
        break;
    default: 
        break;
}

// Capturar respuesta para mostrar alertas
if (isset($response)) {
    //echo $response;
    echo "<script> console.log(" . json_encode($response) . ")</script>";
}

// Obtiene todas las categorías para la vista
$categories = $model->findAll(); 

// Incluye la vista de la lista de categorías.
include __ROOT__ . '/views/category/category.php'; 

die();