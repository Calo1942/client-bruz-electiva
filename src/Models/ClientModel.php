<?php

namespace BruzDeporte\Models;

use PDOException;
use Exception;
use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;

class ClientModel extends DBConnect implements Crud {

    private $cedula;
    private $nombre;
    private $apellido;
    private $correo;
    private $telefono;

    private function getCedula() {
        return $this->cedula;
    }

    private function getNombre() {
        return $this->nombre;
    }

    private function getApellido() {
        return $this->apellido;
    }

    private function getCorreo() {
        return $this->correo;
    }

    private function getTelefono() {
        return $this->telefono;
    }

    private function setCedula($cedula) {
        $this->cedula = $cedula;
    }

    private function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    private function setApellido($apellido) {
        $this->apellido = $apellido;
    }

    private function setCorreo($correo) {
        $this->correo = $correo;
    }

    private function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    public function store($data) {
        try{
            $sql = "INSERT INTO cliente (
                cedula, nombre, apellido, correo, telefono
            ) VALUES (
                :cedula, :nombre, :apellido, :correo, :telefono
            )";
            $stmt = $this->con->prepare($sql);
            return $stmt->execute([
                ':cedula' => $data['cedula'],
                ':nombre' => $data['nombre'],
                ':apellido' => $data['apellido'],
                ':correo' => $data['correo'] ?? null,
                ':telefono' => $data['telefono'] ?? null
            ]);
        } catch (\Exception $e) {
            echo("<script> alert('Error inesperado en Cliente: {" . $e->getMessage() . "}'); </script> ");
            error_log("Error inesperado en Cliente: " . $e->getMessage());
            return false;
        }
    }

    public function findAll() {
        try {
            $stmt = $this->con->query("SELECT * FROM cliente");
            return $stmt->fetchAll();

        } catch (\PDOException $e) {
            error_log("Error en ClientModel::findAll: " . $e->getMessage());
            return false;
        }
    }
 
    public function find($cedula) {
        try {
            $stmt = $this->con->prepare("SELECT * FROM cliente WHERE cedula = ?");
            $stmt->execute([$cedula]);
            return $stmt->fetch();
        } catch (\PDOException $e) {
            error_log("Error al buscar Cliente: " . $e->getMessage());
            return false;
        }
    }
 
    public function update($cedula, $data) {
        $sql = "UPDATE cliente SET
            nombre = :nombre,
            apellido = :apellido,
            correo = :correo,
            telefono = :telefono
            WHERE cedula = :cedula";
        try {    
            $stmt = $this->con->prepare($sql);
            $params = [
                ':nombre' => $data['nombre'],
                ':apellido' => $data['apellido'],
                ':correo' => $data['correo'] ?? null,
                ':telefono' => $data['telefono'] ?? null,
                ':cedula' => $cedula
            ];
            return $stmt->execute($params);
        } catch (\PDOException $e) {
            error_log("Error en ClientModel::update: " . $e->getMessage());
            return false;
        }
    }

    public function delete($cedula) {
        try {
            $stmt = $this->con->prepare("DELETE FROM cliente WHERE cedula = ?");
            return $stmt->execute([$cedula]);
        } catch (\PDOException $e) {
            error_log("Error al eliminar Cliente: " . $e->getMessage());
            return false;
        }
    }
}