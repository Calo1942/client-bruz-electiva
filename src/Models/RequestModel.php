<?php

namespace BruzDeporte\Models;

use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;

class RequestModel extends DBConnect implements Crud {
    // Almacena una nueva solicitud de producto
    public function store($data) {
        $sql = "INSERT INTO SolicitudProducto (
            Cantidad, IdInventario, EstadoPedido
        ) VALUES (
            :Cantidad, :IdInventario, :EstadoPedido
        )";
        $stmt = $this->con->prepare($sql);
        return $stmt->execute([
            ':Cantidad' => $data['Cantidad'],
            ':IdInventario' => $data['IdInventario'],
            ':EstadoPedido' => $data['EstadoPedido'] ?? 'Pendiente'
        ]);
    }
    
    // Recupera todas las solicitudes de productos
    public function findAll() {
        $sql = "SELECT sp.*, i.Stock, i.Color, p.Nombre as NombreProducto, t.Nombre as NombreTalla 
                FROM SolicitudProducto sp 
                LEFT JOIN Inventario i ON sp.IdInventario = i.IdInventario 
                LEFT JOIN Producto p ON i.IdProducto = p.IdProducto 
                LEFT JOIN Talla t ON i.IdTalla = t.IdTalla";
        $stmt = $this->con->query($sql);
        return $stmt->fetchAll();
    }
    
    // Busca una solicitud por su ID
    public function find($idSolicitudPedido) {
        $sql = "SELECT sp.*, i.Stock, i.Color, p.Nombre as NombreProducto, t.Nombre as NombreTalla 
                FROM SolicitudProducto sp 
                LEFT JOIN Inventario i ON sp.IdInventario = i.IdInventario 
                LEFT JOIN Producto p ON i.IdProducto = p.IdProducto 
                LEFT JOIN Talla t ON i.IdTalla = t.IdTalla 
                WHERE sp.IdSolicitudPedido = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->execute([$idSolicitudPedido]);
        return $stmt->fetch();
    }
    
    // Actualiza una solicitud existente
    public function update($idSolicitudPedido, $data) {
        $sql = "UPDATE SolicitudProducto SET
            Cantidad = :Cantidad,
            IdInventario = :IdInventario,
            EstadoPedido = :EstadoPedido
            WHERE IdSolicitudPedido = :IdSolicitudPedido";
        $stmt = $this->con->prepare($sql);
        $params = [
            ':Cantidad' => $data['Cantidad'],
            ':IdInventario' => $data['IdInventario'],
            ':EstadoPedido' => $data['EstadoPedido'],
            ':IdSolicitudPedido' => $idSolicitudPedido
        ];
        return $stmt->execute($params);
    }
    
    // Elimina una solicitud
    public function delete($idSolicitudPedido) {
        $stmt = $this->con->prepare("DELETE FROM SolicitudProducto WHERE IdSolicitudPedido = ?");
        return $stmt->execute([$idSolicitudPedido]);
    }
    
    // Métodos adicionales específicos para solicitudes
    
    // Buscar solicitudes por estado
    public function findByStatus($estado) {
        $sql = "SELECT sp.*, i.Stock, i.Color, p.Nombre as NombreProducto, t.Nombre as NombreTalla 
                FROM SolicitudProducto sp 
                LEFT JOIN Inventario i ON sp.IdInventario = i.IdInventario 
                LEFT JOIN Producto p ON i.IdProducto = p.IdProducto 
                LEFT JOIN Talla t ON i.IdTalla = t.IdTalla 
                WHERE sp.EstadoPedido = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->execute([$estado]);
        return $stmt->fetchAll();
    }
    
    // Buscar solicitudes por inventario
    public function findByInventory($idInventario) {
        $sql = "SELECT sp.*, i.Stock, i.Color, p.Nombre as NombreProducto, t.Nombre as NombreTalla 
                FROM SolicitudProducto sp 
                LEFT JOIN Inventario i ON sp.IdInventario = i.IdInventario 
                LEFT JOIN Producto p ON i.IdProducto = p.IdProducto 
                LEFT JOIN Talla t ON i.IdTalla = t.IdTalla 
                WHERE sp.IdInventario = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->execute([$idInventario]);
        return $stmt->fetchAll();
    }
    
    // Actualizar estado de solicitud
    public function updateStatus($idSolicitudPedido, $nuevoEstado) {
        $sql = "UPDATE SolicitudProducto SET EstadoPedido = ? WHERE IdSolicitudPedido = ?";
        $stmt = $this->con->prepare($sql);
        return $stmt->execute([$nuevoEstado, $idSolicitudPedido]);
    }
    
    // Obtener solicitudes pendientes
    public function getPendingRequests() {
        return $this->findByStatus('Pendiente');
    }
    
    // Obtener solicitudes aprobadas
    public function getApprovedRequests() {
        return $this->findByStatus('Aprobado');
    }
    
    // Obtener solicitudes rechazadas
    public function getRejectedRequests() {
        return $this->findByStatus('Rechazado');
    }
}