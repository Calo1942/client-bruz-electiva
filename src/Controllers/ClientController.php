<?php

namespace BruzDeporte\Controllers;

use BruzDeporte\Models\ClientModel;

// Controlador para gestionar clientes
$model = new ClientModel();
$action = null;

// Manejar peticiones AJAX
if (isset($_POST['getClients'])) {
    $action = 'getClients';
} elseif (isset($_POST['showClient'])) {
    $action = 'showClient';
} elseif (isset($_POST['deleteClient'])) {
    $action = 'deleteClient';
}

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
    // Obtener todos los clientes para DataTable (AJAX)
    case 'getClients':
        $clientes = $model->findAll();
        if ($clientes !== false) {
            echo json_encode($clientes);
        } else {
            echo json_encode([]);
        }
        exit;
        break;
    
    // Obtener un cliente específico (AJAX)
    case 'showClient':
        $cedula = $_POST['cedula'] ?? null;
        if ($cedula) {
            $cliente = $model->find($cedula);
            if ($cliente) {
                echo json_encode(['success' => true, 'data' => $cliente]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Cliente no encontrado']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Cédula no proporcionada']);
        }
        exit;
        break;
    
    // Eliminar cliente (AJAX)
    case 'deleteClient':
        $cedula = $_POST['cedula'] ?? null;
        if ($cedula) {
            $resultado = $model->delete($cedula);
            if ($resultado) {
                echo json_encode(['success' => true, 'message' => 'Cliente eliminado correctamente']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al eliminar el cliente']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Cédula no proporcionada']);
        }
        exit;
        break;
    
    // Almacena un nuevo cliente
    case 'store':
        $data = [
            'cedula' => $_POST['cedula'] ?? '',
            'nombre' => $_POST['nombre'] ?? '',
            'apellido' => $_POST['apellido'] ?? '',
            'correo' => $_POST['correo'] ?? null,
            'telefono' => $_POST['telefono'] ?? null
        ];
        
        $resultado = $model->store($data);

        if (!$resultado) {
            echo("<script> alert('Error inesperado al agregar cliente'); </script> ");
        }

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

            $resultado = $model->update($cedula, $data);
            if (!$resultado) {
                echo("<script> alert('Error inesperado al actualizar cliente'); </script> ");
            }
        }
        break;
    // Elimina un cliente
    case 'delete':
        $cedula = $_POST['delete'] ?? null;
        if ($cedula) {
            $resultado = $model->delete($cedula);
            if (!$resultado) {
                echo("<script> alert('Error inesperado al eliminar cliente'); </script> ");
            }
        }
        break;
    // Lista clientes si no hay acción
    default:
        break;
}

// Incluye la vista de la lista de clientes.
include __ROOT__ . '/views/client/client.php';

die();
