<?php

namespace BruzDeporte\Models;

use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;

class CustomModel extends DBConnect implements Crud {
    // Almacena un nuevo registro de personalización
    public function store($data) {
        try {
            $sql = "INSERT INTO ProdPersonalizacion (
                Descripcion, Imagen, IdCategoria
            ) VALUES (
                :Descripcion, :Imagen, :IdCategoria
            )";
            $stmt = $this->con->prepare($sql);
            return $stmt->execute([
                ':Descripcion' => $data['Descripcion'] ?? null,
                ':Imagen'      => $data['Imagen'], // El nombre del archivo de imagen debe ser gestionado por el controlador
                ':IdCategoria' => $data['IdCategoria']
            ]);
        } catch (\PDOException $e) {
            error_log("Error en CustomModel::store: " . $e->getMessage());
            return false;
        }
    }
    // Recupera todos los registros de personalización
    public function findAll() {
        try {
            $stmt = $this->con->query("SELECT * FROM ProdPersonalizacion");
            $customItems = $stmt->fetchAll();
            // NOTA: La construcción de la URL completa de la imagen debería ocurrir en la capa de la Vista,
            // no en el Modelo. El Modelo debe devolver datos crudos.
            foreach ($customItems as &$item) {
                if (!empty($item['Imagen'])) {
                    $item['Imagen'] = APP_BASE_URL . '/src/storage/img/customs/' . $item['Imagen'];
                }
            }
            return $customItems;
        } catch (\PDOException $e) {
            error_log("Error en CustomModel::findAll: " . $e->getMessage());
            return []; // Es mejor devolver un array vacío que false en caso de error al buscar todos.
        }
    }
    // Busca un registro de personalización por su ID
    public function find($idPersonalizacion) {
        try {
            $stmt = $this->con->prepare("SELECT * FROM ProdPersonalizacion WHERE IdPersonalizacion = ?");
            $stmt->execute([$idPersonalizacion]);
            return $stmt->fetch();
        } catch (\PDOException $e) {
            error_log("Error en CustomModel::find: " . $e->getMessage());
            return false;
        }
    }
    // Actualiza un registro de personalización existente
    public function update($idPersonalizacion, $data) {
        try {
            $sql = "UPDATE ProdPersonalizacion SET
                Descripcion = :Descripcion,
                Imagen = :Imagen,
                IdCategoria = :IdCategoria
                WHERE IdPersonalizacion = :IdPersonalizacion";
            $stmt = $this->con->prepare($sql);
            $params = [
                ':Descripcion'       => $data['Descripcion'] ?? null,
                ':Imagen'            => $data['Imagen'], // El nombre del archivo de imagen debe ser gestionado por el controlador
                ':IdCategoria'       => $data['IdCategoria'],
                ':IdPersonalizacion' => $idPersonalizacion
            ];
            return $stmt->execute($params);
        } catch (\PDOException $e) {
            error_log("Error en CustomModel::update: " . $e->getMessage());
            return false;
        }
    }
    // Elimina un registro de personalización
    public function delete($idPersonalizacion) {
        try {
            $stmt = $this->con->prepare("DELETE FROM ProdPersonalizacion WHERE IdPersonalizacion = ?");
            return $stmt->execute([$idPersonalizacion]);
        } catch (\PDOException $e) {
            error_log("Error en CustomModel::delete: " . $e->getMessage());
            return false;
        }
    }
}