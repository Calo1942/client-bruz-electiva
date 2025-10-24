<?php

namespace BruzDeporte\Controllers;

use BruzDeporte\Models\ProductModel;
use BruzDeporte\Models\CategoryModel;

// Controlador para gestionar productos
$model = new ProductModel();
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

switch ($action) {
    // Almacena un nuevo producto
    case 'store':
        $data = [
            'nombre' => $_POST['nombre'] ?? '',
            'descripcion' => $_POST['descripcion'] ?? null,
            'precio_detal' => $_POST['precio_detal'] ?? 0,
            'precio_mayor' => $_POST['precio_mayor'] ?? null,
            'id_categoria' => $_POST['id_categoria'] ?? null
        ];
        $model->store($data);
        break;
    // Actualiza un producto existente
    case 'update':
        $id = $_POST['id_producto'] ?? null;
        if ($id) {
            $data = [
                'nombre' => $_POST['nombre'] ?? '',
                'descripcion' => $_POST['descripcion'] ?? null,
                'precio_detal' => $_POST['precio_detal'] ?? 0,
                'precio_mayor' => $_POST['precio_mayor'] ?? null,
                'id_categoria' => $_POST['id_categoria'] ?? null
            ];
            $model->update($id, $data);
        }
        break;
    // Elimina un producto
    case 'delete':
        $id = filter_input(INPUT_POST, 'delete', FILTER_VALIDATE_INT);
        if ($id !== false) {
            $model->delete($id);
        }
        break;
    // Muestra detalles de un producto específico
    case 'show':
        $id = $_POST['show'];
        $producto = $model->find($id);
        break;
    // Lista productos si no hay acción
    default:
        break;
}

// Obtiene todos los productos y categorías para la vista
$products = $model->findAll();
$categoryModel = new CategoryModel();
$categories = $categoryModel->findAll();
$data = [
    'products' => $products,
    'categories' => $categories
];

include __ROOT__ . '/views/product/product.php';

die();
