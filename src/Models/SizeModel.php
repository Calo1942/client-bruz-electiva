<?php

namespace BruzDeporte\Models;

use Exception;
use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;

class SizeModel extends DBConnect implements Crud {
    private $idTalla;
    private $nombre;

    public function setIdTalla($idTalla) {
        $this->idTalla = $idTalla;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }   

    public function getIdTalla() {
        return $this->idTalla;
    }       
    
    public function getNombre() {
        return $this->nombre;
    }

    public function store($data) {
        try {
            $this->setNombre($data['Nombre'] ?? '');

            if (empty($this->getNombre())) {
                throw new Exception('Nombre requerido');
            }
            $sql = "INSERT INTO Talla (Nombre) VALUES (:Nombre)";
            $stmt = $this->con->prepare($sql);
            return $stmt->execute([
                ':Nombre' => $this->getNombre()
            ]);
        } catch (Exception $e) {
            echo "Ocurrió un problema: " . $e->getMessage();
            return false;
        }
    }

    public function findAll() {
        try {
            $stmt = $this->con->query("SELECT * FROM Talla");
            return $stmt->fetchAll();
        } catch (Exception $e) {
            echo "Ocurrió un problema: " . $e->getMessage();
            return false;
        }
    }

    public function find($idTalla) {
        try {
            $stmt = $this->con->prepare("SELECT * FROM Talla WHERE IdTalla = ?");
            $stmt->execute([$idTalla]);
            $row = $stmt->fetch();
            if ($row) {
                $this->setIdTalla($row['IdTalla']);
                $this->setNombre($row['Nombre']);
            }
            return $row;
        } catch (Exception $e) {
            echo "Ocurrió un problema: " . $e->getMessage();
            return false;
        }
    }

    public function update($idTalla, $data)
    {
        try {
            $this->setIdTalla($idTalla);
            $this->setNombre($data['Nombre'] ?? null);

            if (empty($this->getNombre())) {
                return false;
            }

            $sql = "UPDATE Talla SET Nombre = :Nombre WHERE IdTalla = :IdTalla";
            $stmt = $this->con->prepare($sql);

            return $stmt->execute([
                ':Nombre' => $this->getNombre(),
                ':IdTalla' => $this->getIdTalla()
            ]);
        } catch (\Exception $e) {
            echo "Ocurrió un problema: " . $e->getMessage();
            return false;
        }
    }

    public function delete($idTalla){
    
        try {
            $this->setIdTalla($idTalla);

        $stmt = $this->con->prepare("DELETE FROM Talla WHERE IdTalla = :IdTalla");
        return $stmt->execute([':IdTalla' => $this->getIdTalla()]);

        } catch (\Exception $e) {
            echo "Ocurrió un problema: " . $e->getMessage();
            return false;
        }
    }
}