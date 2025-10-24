<?php

namespace BruzDeporte\Models;

use Exception;
use BruzDeporte\config\connect\DBConnect;
use BruzDeporte\config\interfaces\Crud;
use BruzDeporte\Helpers\Validations;

class CategoryModel extends DBConnect implements Crud
{
    use Validations;
    
    private $id_categoria;
    private $nombre;

    private function setIdCategoria($id_categoria) {
        if (self::validate_id($id_categoria) === false) {
            //throw new Exception('ID de categoría inválido');;
            //return "<script>alert('ID de categoría inválido');</script>";
            return ['status' => 'error', 
                    'code' => 400,
                    'message' => 'ID de categoría inválido'
                ];
        } else {
            $this->id_categoria = $id_categoria;
        }
    }
    
    private function setNombre($nombre) {
        if (self::validate_names($nombre) === false) {
            //throw new Exception('Nombre inválido');;
            // return "<script>alert('Nombre inválido');</script>";
            return ['status' => 'error', 
                    'code' => 400,
                    'message' => 'Nombre inválido'
                ];
        } else {
            $this->nombre = $nombre;
        }
    }

    private function getIdCategoria() {
        return $this->id_categoria;
    }

    private function getNombre() { 
        return $this->nombre;
    }

    public function store($data)
    {
        try {
            $this->setNombre($data['nombre']);
            $sql = "INSERT INTO categoria (nombre) VALUES (:nombre)";
            $stmt = $this->con->prepare($sql);
            $stmt->bindValue(1, $this->getNombre());
            if ($stmt->execute()) {
                return ['status' => 'success', 
                        'code' => 201,
                        'message' => 'Categoría almacenada exitosamente',
                        'data' => ''
                    ];
            } else {
                throw new Exception('Error al almacenar la categoría');
            }
        } catch (\Exception $e) {
            //return '<script>alert("Ocurrió un problema al almacenar los datos") ;</script>';
            return ['status' => 'error', 
                    'code' => 500,
                    'message' => 'Ocurrió un problema al almacenar los datos',
                    'error' => $e->getMessage()
                ];
            //return false;
        }
    }

    public function findAll()
    {
        try {
            $stmt = $this->con->query("SELECT * FROM categoria");
            $result = $stmt->fetchAll();

            /*
            return ['status' => 'success', 
                    'code' => 200,
                    'message' => 'Categorías extraídas exitosamente',
                    'data' => $result
            ];
            */
        } catch (\Exception $e) {
            //return '<script>alert("Ocurrió un problema al extraer los datos") ;</script>';
            return ['status' => 'error', 
                    'code' => 500,
                    'message' => 'Ocurrió un problema al extraer las categorias',
                    'error' => $e->getMessage()
            ];
            //return false;
        }
    }

    public function find($id_categoria)
    {
        try {
            $this->setIdCategoria($id_categoria);

            $stmt = $this->con->prepare("SELECT * FROM categoria WHERE id_categoria = :id_categoria");
            $stmt->bindValue(1, $this->getIdCategoria());
            $stmt->execute();
            $result = $stmt->fetch();
            
            /*
            if ($result) {
                return ['status' => 'success', 
                        'code' => 201,
                        'message' => 'Categoría almacenada exitosamente',
                        'data' => $result
                    ];
            }
            */

        } catch (\Exception $e) {
            //return '<script>alert("Ocurrió un problema al extraer el dato") ;</script>';
            return ['status' => 'error', 
                    'code' => 500,
                    'message' => 'Ocurrió un problema al extraer la categoria',
                    'error' => $e->getMessage()
            ];
            //return false;
        }
    }

    public function update($id_categoria, $data)
    {
        try {
            $this->setIdCategoria($id_categoria);
            $this->setNombre($data['nombre']);

            $sql = "UPDATE categoria SET nombre = :nombre WHERE id_categoria = :id_categoria";
            $stmt = $this->con->prepare($sql);

            $stmt->bindValue(1, $this->getNombre());
            $stmt->bindValue(2, $this->getIdCategoria());

            $result = $stmt->execute();

            /*
            if ($result) {
                return ['status' => 'success', 
                        'code' => 200,
                        'message' => 'Categorías editada exitosamente',
                        'data' => ''
                ];
            } else {
                throw new Exception('Error al editar la categoría');
            }
            */

        } catch (\Exception $e) {
            //return '<script>alert("Ocurrió un problema al actualizar el dato") ;</script>';
            return ['status' => 'error', 
                    'code' => 500,
                    'message' => 'Ocurrió un problema al actualizar la categoria',
                    'error' => $e->getMessage()
            ];
            //return false; 
        }
    }

    public function delete($id_categoria)
    {
        try {
            $this->setIdCategoria($id_categoria);

            $stmt = $this->con->prepare("DELETE FROM categoria WHERE id_categoria = :id_categoria");
            $stmt->bindValue(1, $this->getIdCategoria());
            $result = $stmt->execute();

            /*
            if ($result) {
                return ['status' => 'success', 
                        'code' => 200,
                        'message' => 'Categorías eliminada exitosamente',
                        'data' => ''
                ];
            } else {
                throw new Exception('Error al eliminar la categoría');
            }
            */

        } catch (\Exception $e) {
            //return '<script>alert("Ocurrió un problema al eliminar el dato") ;</script>';
            return ['status' => 'error', 
                    'code' => 500,
                    'message' => 'Ocurrió un problema al eliminar la categoria',
                    'error' => $e->getMessage()
            ];
            //return false;
        }
    }
}