<?php

namespace BruzDeporte\Controllers;

use BruzDeporte\Models\ProductModel;
use BruzDeporte\Models\CategoryModel;

$module_config = [
    'primary_key' => 'id_producto',
    'fields' => ['nombre', 'descripcion', 'stock', 'precio_detal', 'precio_mayor', 'id_categoria'], // 'imagen' se maneja desde $_FILES en el modelo
    'view_path' => 'product/product.php'
];

$model = new ProductModel();
$action = null;

// Determina la acción basándose en las solicitudes POST
if (isset($_POST['store'])) {
    $action = 'store';
} elseif (isset($_POST['update'])) {
    $action = 'update';
} elseif (isset($_POST['delete'])) {
    $action = 'delete';
} elseif (isset($_POST['show'])) {
    $action = 'show';
} elseif (isset($_POST['getAll'])) {
    $action = 'getAll';
}

// Procesar acciones
if ($action) {
    switch ($action) {
        case 'store':
            $data = [];
            foreach ($module_config['fields'] as $field) {
                $data[$field] = $_POST[$field] ?? '';
            }
            $result = $model->store($data);
            if ($result) {
                header('Content-Type: application/json');
                echo json_encode($result);
            }
            exit;

        case 'update':
            $id = $_POST[$module_config['primary_key']] ?? null;
            if ($id) {
                $data = [];
                foreach ($module_config['fields'] as $field) {
                    $data[$field] = $_POST[$field] ?? '';
                }
                $result = $model->update($id, $data);
                if ($result) {
                    header('Content-Type: application/json');
                    echo json_encode($result);
                }
            }
            exit;

        case 'delete':
            $id = $_POST['delete'] ?? null;
            if ($id) {
                $result = $model->delete($id);
                if ($result) {
                    header('Content-Type: application/json');
                    echo json_encode($result);
                }
            }
            exit;

        case 'show':
            $id = $_POST['show'] ?? null;
            if ($id) {
                $result = $model->find($id);
                if ($result) {
                    header('Content-Type: application/json');
                    echo json_encode($result);
                }
            }
            exit;

        case 'getAll':
            $result = $model->findAll();
            if ($result) {
                header('Content-Type: application/json');
                echo json_encode($result);
            }
            exit;
    }
}

// Cargar categorías para los select de los modales
$categoryModel = new CategoryModel();
$categoriesResult = $categoryModel->findAll();
$categories = [];
if ($categoriesResult && $categoriesResult['success']) {
    $categories = $categoriesResult['data'] ?? [];
}

// Incluir vista
include __ROOT__ . '/views/' . $module_config['view_path'];

die();