<?php

namespace BruzDeporte\Models;

use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;

class ProductModel extends DBConnect implements Crud {
    
    private $id_producto;
    private $nombre;
    private $descripcion;
    private $precio_detal;
    private $precio_mayor;
    private $id_categoria;

    // Getters
    public function getIdProducto() {
        return $this->id_producto;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getDescripcion() {
        return $this->descripcion;
    }

    public function getPrecioDetal() {
        return $this->precio_detal;
    }

    public function getPrecioMayor() {
        return $this->precio_mayor;
    }

    public function getIdCategoria() {
        return $this->id_categoria;
    }

    // Setters
    public function setIdProducto($id_producto) {
        $this->id_producto = $id_producto;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    public function setPrecioDetal($precio_detal) {
        $this->precio_detal = $precio_detal;
    }

    public function setPrecioMayor($precio_mayor) {
        $this->precio_mayor = $precio_mayor;
    }

    public function setIdCategoria($id_categoria) {
        $this->id_categoria = $id_categoria;
    }

    public function store($data) {
        $this->setNombre($data['nombre']);
        $this->setDescripcion($data['descripcion'] ?? null);
        $this->setPrecioDetal($data['precio_detal']);
        $this->setPrecioMayor($data['precio_mayor'] ?? null);
        $this->setIdCategoria($data['id_categoria']);

        try {
            $sql = "INSERT INTO producto (
                nombre, descripcion, precio_detal, precio_mayor, id_categoria
            ) VALUES (
                :nombre, :descripcion, :precio_detal, :precio_mayor, :id_categoria
            )";
            $stmt = $this->con->prepare($sql);
            return $stmt->execute([
                ':nombre' => $this->getNombre(),
                ':descripcion' => $this->getDescripcion(),
                ':precio_detal' => $this->getPrecioDetal(),
                ':precio_mayor' => $this->getPrecioMayor(),
                ':id_categoria' => $this->getIdCategoria()
            ]);
        } catch (\PDOException $e) {
            error_log("Error en Producto: " . $e->getMessage());
            return false;
        }
    }

    public function findAll() {
        $sql = "SELECT p.*, c.nombre as nombre_categoria 
            FROM producto p 
            LEFT JOIN categoria c ON p.id_categoria = c.id_categoria";
        try{
            $stmt = $this->con->query($sql);
            $Productos = $stmt->fetchAll();
            return $Productos;
        } catch (\PDOException $e) {
            error_log("Error al obtener Productos: " . $e->getMessage());
            return false;
        }
    }

    public function find($id_producto) {
        $sql = "SELECT p.*, c.nombre as nombre_categoria 
                FROM producto p 
                LEFT JOIN categoria c ON p.id_categoria = c.id_categoria 
                WHERE p.id_producto = ?";
        try{
            $stmt = $this->con->prepare($sql);
            $stmt->execute([$id_producto]);
            $Producto = $stmt->fetch();
            return $Producto;
        } catch (\PDOException $e) {
            error_log("Error al buscar Producto: " . $e->getMessage());
            return false;
        }
    }

    public function update($id_producto, $data) {
        $this->setIdProducto($id_producto);
        $this->setNombre($data['nombre']);
        $this->setDescripcion($data['descripcion'] ?? null);
        $this->setPrecioDetal($data['precio_detal']);
        $this->setPrecioMayor($data['precio_mayor'] ?? null);
        $this->setIdCategoria($data['id_categoria']);

        $sql = "UPDATE producto SET
            nombre = :nombre,
            descripcion = :descripcion,
            precio_detal = :precio_detal,
            precio_mayor = :precio_mayor,
            id_categoria = :id_categoria
            WHERE id_producto = :id_producto";
        try {
            $stmt = $this->con->prepare($sql);
            $params = [
                ':nombre' => $this->getNombre(),
                ':descripcion' => $this->getDescripcion(),
                ':precio_detal' => $this->getPrecioDetal(),
                ':precio_mayor' => $this->getPrecioMayor(),
                ':id_categoria' => $this->getIdCategoria(),
                ':id_producto' => $this->getIdProducto()
            ];
            return $stmt->execute($params);
        } catch (\PDOException $e) {
            error_log("Error al actualizar Producto: " . $e->getMessage());
            return false;
    }
    }
    
    public function delete($id_producto) {
        try {
            $stmt = $this->con->prepare("DELETE FROM producto WHERE id_producto = ?");
            return $stmt->execute([$id_producto]);
        } catch (\PDOException $e) {
            error_log("Error al eliminar Producto: " . $e->getMessage());
            return false;
        }
    }
}