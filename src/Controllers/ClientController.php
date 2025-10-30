<?php

namespace BruzDeporte\Controllers;

use BruzDeporte\Models\ClientModel;

// Configuración del Módulo
$module_config = [
    'primary_key' => 'cedula',
    'fields' => ['nombre', 'apellido', 'correo', 'telefono'],
    'view_path' => 'client/client.php'
];

$model = new ClientModel();
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
            // Incluir la clave primaria (cedula) si está presente
            if (isset($_POST[$module_config['primary_key']])) {
                $data[$module_config['primary_key']] = $_POST[$module_config['primary_key']];
            }
            // Incluir los demás campos
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

// Incluir vista
include __ROOT__ . '/views/' . $module_config['view_path'];

die();