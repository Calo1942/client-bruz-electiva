<?php

namespace BruzDeporte\Controllers;

use BruzDeporte\Models\RequestModel; 

// Controlador para gestionar solicitudes de productos
$model = new RequestModel();
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
    // Almacena una nueva solicitud de producto
    case 'store':
        $data = [
            'Cantidad' => $_POST['Cantidad'] ?? 0,
            'IdInventario' => $_POST['IdInventario'] ?? null,
            'EstadoPedido' => $_POST['EstadoPedido'] ?? 'Pendiente'
        ];
        $model->store($data); 
        break;
    // Actualiza una solicitud existente
    case 'update':
        $idSolicitudPedido = $_POST['IdSolicitudPedido'] ?? null; 
        if ($idSolicitudPedido) {
            $data = [
                'Cantidad' => $_POST['Cantidad'] ?? 0,
                'IdInventario' => $_POST['IdInventario'] ?? null,
                'EstadoPedido' => $_POST['EstadoPedido'] ?? 'Pendiente'
            ];
            $model->update($idSolicitudPedido, $data); 
        }
        break;
    // Elimina una solicitud
    case 'delete':
        $idSolicitudPedido = $_POST['delete'] ?? null;
        if ($idSolicitudPedido) {
            $model->delete($idSolicitudPedido); 
        }
        break;
    // Muestra detalles de una solicitud específica
    case 'show':
        $idSolicitudPedido = $_POST['show']; 
        $request = $model->find($idSolicitudPedido); 
        break;
    // Lista solicitudes si no hay acción
    default:
        break;
}

// Obtiene todas las solicitudes para la vista
$requests = $model->findAll(); 

// Incluye la vista de la lista de solicitudes.
include __ROOT__ . '/views/request/request.php';

die();
