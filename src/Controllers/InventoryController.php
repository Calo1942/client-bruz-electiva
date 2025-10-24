<?php

namespace BruzDeporte\Controllers;
use BruzDeporte\Models\InventoryModel; 
use BruzDeporte\Models\ProductModel;
use BruzDeporte\Models\SizeModel;

// Controlador para gestionar inventario
$model = new InventoryModel();
$productModel = new ProductModel();
$tallaModel = new SizeModel();
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
    // Almacena un nuevo registro de inventario
    case 'store':
        $data = [
            'Stock' => $_POST['Stock'] ?? 0,
            'IdProducto' => $_POST['IdProducto'] ?? null,
            'IdTalla' => $_POST['IdTalla'] ?? null,
            'Color' => $_POST['Color'] ?? '',
        ];
        $model->store($data);
        break;
    // Actualiza un registro de inventario existente
    case 'update':
        $id = $_POST['IdVariante'] ?? null;
        if ($id) {
            $data = [
                'Stock' => $_POST['Stock'] ?? 0,
                'IdProducto' => $_POST['IdProducto'] ?? null,
                'IdTalla' => $_POST['IdTalla'] ?? null,
                'Color' => $_POST['Color'] ?? '',
            ];
            $model->update($id, $data);
        }
        break;
    // Elimina un registro de inventario
    case 'delete':
        $id = $_POST['delete'] ?? null;
        if ($id) {
            $model->delete($id);
        }
        break;
    // Muestra detalles de un registro de inventario específico
    case 'show':
        $id = $_POST['show'];
        $inventario = $model->find($id);
        break;
    // Lista inventario si no hay acción
    default:
        break;
}

// Obtiene todos los registros de inventario para la vista
$inventario = $model->findAll();

// Obtiene productos y tallas para los selectores
$productos = $productModel->findAll();
$tallas = $tallaModel->findAll();

$data = [
    'inventario' => $inventario,
    'productos' => $productos,
    'tallas' => $tallas
];

// Incluye la vista de la lista de inventario.
include __ROOT__ . '/views/inventory/inventory.php';

die();
