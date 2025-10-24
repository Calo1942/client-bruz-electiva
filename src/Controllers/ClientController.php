<?php

namespace BruzDeporte\Controllers;

use BruzDeporte\Models\ClientModel;

// Controlador para gestionar clientes
$model = new ClientModel();
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
    // Almacena un nuevo cliente
    case 'store':
        $data = [
            'cedula' => $_POST['cedula'] ?? '',
            'nombre' => $_POST['nombre'] ?? '',
            'apellido' => $_POST['apellido'] ?? '',
            'correo' => $_POST['correo'] ?? null,
            'telefono' => $_POST['telefono'] ?? null
        ];
        $model->store($data);
        break;
    // Actualiza un cliente existente
    case 'update':
        $cedula = $_POST['cedula'] ?? null;
        if ($cedula) {
            $data = [
                'nombre' => $_POST['nombre'] ?? '',
                'apellido' => $_POST['apellido'] ?? '',
                'correo' => $_POST['correo'] ?? null,
                'telefono' => $_POST['telefono'] ?? null
            ];
            $model->update($cedula, $data);
        }
        break;
    // Elimina un cliente
    case 'delete':
        $cedula = $_POST['delete'] ?? null;
        if ($cedula) {
            $model->delete($cedula);
        }
        break;
    // Muestra detalles de un cliente específico
    case 'show':
        $cedula = $_POST['show'];
        $cliente = $model->find($cedula);
        break;
    // Lista clientes si no hay acción
    default:
        break;
}

// Obtiene todos los clientes para la vista
$clientes = $model->findAll();

// Incluye la vista de la lista de clientes.
include __ROOT__ . '/views/client/client.php';

die();
