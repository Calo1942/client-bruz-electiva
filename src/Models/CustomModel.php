<?php

namespace BruzDeporte\Models;

use Exception;
use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;
use BruzDeporte\Helpers\Validations;
use BruzDeporte\Helpers\ApiResponse;
use BruzDeporte\Helpers\ImageHandler;

class CustomModel extends DBConnect implements Crud
{
    use Validations, ApiResponse, ImageHandler;
    
    protected $table = 'prod_personalizacion';
    protected $idField = 'id_personalizacion';
    protected $fields = [
        'descripcion' => 'validate_description',
        'id_categoria' => 'validate_id',
        'imagen' => 'validate_nombre_archivo',
    ];
    protected $module_name = [
        'singular' => 'Personalizado',
        'plural' => 'Personalizados'
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
            
            // Manejo de imagen si existe
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] !== UPLOAD_ERR_NO_FILE) {
                $imagePath = $this->uploadImage($_FILES['imagen']);
                $columns[] = 'imagen';
                $placeholders[] = "?";
                $values[] = $imagePath;
            }
            
            $sql = "INSERT INTO {$this->table} (" . implode(', ', $columns) . ") 
                    VALUES (" . implode(', ', $placeholders) . ")";
            
            $stmt = $this->con->prepare($sql);
            if ($stmt->execute($values)) {
                return self::success(201, "{$this->module_name['singular']} creado exitosamente");
            }
            throw new Exception('Error al guardar');
            
        } catch (\Exception $e) {
            return self::error(500, 'Error al almacenar' , $e->getMessage());
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
            // Obtener imagen actual
            $currentImage = null;
            $product = $this->find($id);
            if ($product['success'] && isset($product['data']['imagen'])) {
                $currentImage = $product['data']['imagen'];
            }
            
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
            
            // Manejo de nueva imagen
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] !== UPLOAD_ERR_NO_FILE) {
                $imagePath = $this->uploadImage($_FILES['imagen'], $currentImage);
                $updates[] = "imagen = ?";
                $values[] = $imagePath;
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
            // Obtener imagen antes de eliminar
            $product = $this->find($id);
            if ($product['success'] && isset($product['data']['imagen'])) {
                $this->deleteImage($product['data']['imagen']);
            }
            
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