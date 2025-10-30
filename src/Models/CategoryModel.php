<?php

namespace BruzDeporte\Models;

use Exception;
use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;
use BruzDeporte\Helpers\Validations;
use BruzDeporte\Helpers\ApiResponse;

class CategoryModel extends DBConnect implements Crud
{
    use Validations, ApiResponse;
    
    protected $table = 'categoria';
    protected $idField = 'id_categoria';
    protected $fields = [
        'nombre' => 'validate_names'
    ];
    protected $module_name = [
        'singular' => 'Categoría',
        'plural' => 'Categorías'
    ];

    public function store($data)
    {
        try {
            $columns = [];
            $placeholders = [];
            $values = [];
            
            foreach ($this->fields as $field => $validation) {
                if (isset($data[$field])) {
                    if ($validation && !$this->$validation($data[$field])) {
                        throw new Exception("Campo $field inválido");
                    }
                    $columns[] = $field;
                    $placeholders[] = "?";
                    $values[] = $data[$field];
                }
            }
            
            $sql = "INSERT INTO {$this->table} (" . implode(', ', $columns) . ") 
                    VALUES (" . implode(', ', $placeholders) . ")";
            
            $stmt = $this->con->prepare($sql);
            if ($stmt->execute($values)) {
                return self::success(201, "{$this->module_name['singular']} creado exitosamente");
            }
            throw new Exception('Error al guardar');
            
        } catch (\Exception $e) {
            return self::error(500, 'Error al almacenar', $e->getMessage());
        }
    }

    public function findAll()
    {
        try {
            $stmt = $this->con->query("SELECT * FROM {$this->table}");
            $result = $stmt->fetchAll();
            return self::success(200, "{$this->module_name['plural']} obtenidos", $result);
        } catch (\Exception $e) {
            return self::error(500, 'Error al obtener', $e->getMessage());
        }
    }

    public function find($id)
    {
        try {
            $stmt = $this->con->prepare("SELECT * FROM {$this->table} WHERE {$this->idField} = ?");
            $stmt->execute([$id]);
            $result = $stmt->fetch();
            return self::success(200, "{$this->module_name['singular']} obtenido", $result);
        } catch (\Exception $e) {
            return self::error(500, 'Error al obtener', $e->getMessage());
        }
    }

    public function update($id, $data)
    {
        try {
            $updates = [];
            $values = [];
            
            foreach ($this->fields as $field => $validation) {
                if (isset($data[$field])) {
                    if ($validation && !$this->$validation($data[$field])) {
                        throw new Exception("Campo $field inválido");
                    }
                    $updates[] = "$field = ?";
                    $values[] = $data[$field];
                }
            }
            
            $values[] = $id;
            $sql = "UPDATE {$this->table} SET " . implode(', ', $updates) . " 
                    WHERE {$this->idField} = ?";
                    
            $stmt = $this->con->prepare($sql);
            if ($stmt->execute($values)) {
                return self::success(200, "{$this->module_name['singular']} actualizado");
            }
            throw new Exception('Error al actualizar');
            
        } catch (\Exception $e) {
            return self::error(500, 'Error al actualizar', $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $sql = "DELETE FROM {$this->table} WHERE {$this->idField} = ?";
            $stmt = $this->con->prepare($sql);
            if ($stmt->execute([$id])) {
                return self::success(200, "{$this->module_name['singular']} eliminado");
            }
            throw new Exception('Error al eliminar');
        } catch (\Exception $e) {
            return self::error(500, 'Error al eliminar', $e->getMessage());
        }
    }
}