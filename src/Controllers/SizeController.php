<?php

namespace BruzDeporte\Controllers;

use BruzDeporte\Models\SizeModel; 

// Controlador para gestionar tallas
$model = new SizeModel();
$action = null;

// Detecta la acción solicitada por POST
if (isset($_POST['store'])) {
    $action = 'store';
} elseif (isset($_POST['update'])) {
    $action = 'update';
} elseif (isset($_POST['delete'])) {
    $action = 'delete';
} elseif (isset($_POST['show'])) {
    $action = 'show';
}

// Estructura switch para manejar las diferentes acciones.
switch ($action) {
    // Almacena una nueva talla
    case 'store':
        $data = [
            'Nombre' => $_POST['Nombre'] ?? '' 
        ];
        $model->store($data); 
        break;
    // Actualiza una talla existente
    case 'update':
        $idTalla = $_POST['IdTalla'] ?? null; 
        if ($idTalla) {
            $data = [
                'Nombre' => $_POST['Nombre'] ?? '' 
            ];
            $model->update($idTalla, $data); 
        }
        break;
    // Elimina una talla
    case 'delete':
        $idTalla = $_POST['delete'] ?? null;
        if ($idTalla) {
            $model->delete($idTalla); 
        }
        break;
    // Muestra detalles de una talla específica
    case 'show':
        $idTalla = $_POST['show']; 
        $size = $model->find($idTalla); 
        break;
    // Lista tallas si no hay acción
    default:
        break;
}

// Obtiene todas las tallas para la vista
$tallas = $model->findAll(); 

// Incluye la vista de la lista de tallas.
include __ROOT__ . '/views/size/size.php';

die();
