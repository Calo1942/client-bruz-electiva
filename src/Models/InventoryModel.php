<?php

namespace BruzDeporte\Models;

use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;

class InventoryModel extends DBConnect implements Crud {
    // Almacena un nuevo registro de inventario
    public function store($data) {
        $sql = "INSERT INTO variante (
            stock, id_producto, id_talla, color
        ) VALUES (
            :stock, :id_producto, :id_talla, :color
        )";
        $stmt = $this->con->prepare($sql);
        return $stmt->execute([
            ':stock' => $data['stock'],
            ':id_producto' => $data['id_producto'],
            ':id_talla' => $data['id_talla'],
            ':color' => $data['color']
        ]);
    }
    
    // Recupera todos los registros de inventario
    public function findAll() {
        $sql = "SELECT i.*, p.nombre as nombre_producto, t.nombre as nombre_talla 
                FROM variante i 
                LEFT JOIN producto p ON i.id_producto = p.id_producto 
                LEFT JOIN talla t ON i.id_talla = t.id_talla";
        $stmt = $this->con->query($sql);
        return $stmt->fetchAll();
    }
    
    // Busca un registro de variante por su ID
    public function find($id_variante) {
        $sql = "SELECT i.*, p.nombre as nombre_producto, t.nombre as nombre_talla 
                FROM variante i 
                LEFT JOIN producto p ON i.id_producto = p.id_producto 
                LEFT JOIN talla t ON i.id_talla = t.id_talla 
                WHERE i.id_variante = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->execute([$id_variante]);
        return $stmt->fetch();
    }
    
    // Actualiza un registro de variante existente
    public function update($id_variante, $data) {
        $sql = "UPDATE variante SET
            stock = :stock,
            id_producto = :id_producto,
            id_talla = :id_talla,
            color = :color
            WHERE id_variante = :id_variante";
        $stmt = $this->con->prepare($sql);
        $params = [
            ':stock' => $data['stock'],
            ':id_producto' => $data['id_producto'],
            ':id_talla' => $data['id_talla'],
            ':color' => $data['color'],
            ':id_variante' => $id_variante
        ];
        return $stmt->execute($params);
    }
    
    // Elimina un registro de inventario
    public function delete($id_variante) {
        $stmt = $this->con->prepare("DELETE FROM variante WHERE id_variante = ?");
        return $stmt->execute([$id_variante]);
    }
    
    // Métodos adicionales específicos para inventario
    
    // Buscar variante por producto
    public function findByProduct($id_producto) {
        $sql = "SELECT i.*, p.nombre as nombre_producto, t.nombre as nombre_talla 
                FROM variante i 
                LEFT JOIN producto p ON i.id_producto = p.id_producto 
                LEFT JOIN talla t ON i.id_talla = t.id_talla 
                WHERE i.id_producto = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->execute([$id_producto]);
        return $stmt->fetchAll();
    }
    
    // Buscar variante por talla
    public function findBySize($id_talla) {
        $sql = "SELECT i.*, p.nombre as nombre_producto, t.nombre as nombre_talla 
                FROM variante i 
                LEFT JOIN producto p ON i.id_producto = p.id_producto 
                LEFT JOIN talla t ON i.id_talla = t.id_talla 
                WHERE i.id_talla = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->execute([$id_talla]);
        return $stmt->fetchAll();
    }
    
    // Actualizar stock
    public function updatestock($id_variante, $nuevostock) {
        $sql = "UPDATE variante SET stock = ? WHERE id_variante = ?";
        $stmt = $this->con->prepare($sql);
        return $stmt->execute([$nuevostock, $id_variante]);
    }
    
    // Obtener productos con stock bajo (menos de 10 unidades)
    public function getLowstock() {
        $sql = "SELECT i.*, p.nombre as nombre_producto, t.nombre as nombre_talla 
                FROM variante i 
                LEFT JOIN producto p ON i.id_producto = p.id_producto 
                LEFT JOIN talla t ON i.id_talla = t.id_talla 
                WHERE i.stock < 10";
        $stmt = $this->con->query($sql);
        return $stmt->fetchAll();
    }
}