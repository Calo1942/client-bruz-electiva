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
// Verificar tanto $_POST como $_REQUEST para asegurar compatibilidad con FormData
if (isset($_POST['store']) || isset($_REQUEST['store'])) {
    $action = 'store';
} elseif (isset($_POST['update']) || isset($_REQUEST['update'])) {
    $action = 'update';
} elseif (isset($_POST['delete']) || isset($_REQUEST['delete'])) {
    $action = 'delete';
} elseif (isset($_POST['show']) || isset($_REQUEST['show'])) {
    $action = 'show';
} elseif (isset($_POST['getAll']) || isset($_REQUEST['getAll'])) {
    $action = 'getAll';
}

// Procesar acciones
if ($action) {
    switch ($action) {
        case 'store':
            $data = [];
            foreach ($module_config['fields'] as $field) {
                $data[$field] = $_POST[$field] ?? $_REQUEST[$field] ?? '';
            }
            $result = $model->store($data);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($result);
            exit;

        case 'update':
            $id = $_POST[$module_config['primary_key']] ?? $_REQUEST[$module_config['primary_key']] ?? null;
            if ($id) {
                $data = [];
                foreach ($module_config['fields'] as $field) {
                    $data[$field] = $_POST[$field] ?? $_REQUEST[$field] ?? '';
                }
                $result = $model->update($id, $data);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($result);
            } else {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'message' => 'ID de producto no proporcionado']);
            }
            exit;

        case 'delete':
            $id = $_POST['delete'] ?? $_REQUEST['delete'] ?? null;
            if ($id) {
                $result = $model->delete($id);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($result);
            } else {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
            }
            exit;

        case 'show':
            $id = $_POST['show'] ?? $_REQUEST['show'] ?? null;
            if ($id) {
                $result = $model->find($id);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($result);
            } else {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
            }
            exit;

        case 'getAll':
            $result = $model->findAll();
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($result);
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