<?php

namespace BruzDeporte\Helpers;

use Exception;

trait ImageHandler
{
    protected $imageUploadDir = 'src/storage/images/';              // Directorio donde se guardarán las imágenes
    protected $allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];      // Tipos de archivo permitidos
    protected $maxFileSize = 5 * 1024 * 1024;       // Tamaño máximo de archivo (5MB)

    public function uploadImage($file, $currentImage = null)
    {
        try {
            // Validar que existe el archivo
            if (!isset($file) || $file['error'] === UPLOAD_ERR_NO_FILE) {
                return $currentImage; // Mantener imagen actual si no se sube nueva
            }

            // Validar errores de subida
            if ($file['error'] !== UPLOAD_ERR_OK) {
                throw new Exception("Error en la subida del archivo: " . $this->getUploadError($file['error']));
            }

            // Validar tipo MIME real
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $file['tmp_name']);
            finfo_close($finfo);

            if (!in_array($mimeType, $this->allowedImageTypes)) {
                throw new Exception("Tipo de archivo no permitido. Formatos aceptados: JPEG, PNG, GIF, WebP");
            }

            // Validar tamaño
            if ($file['size'] > $this->maxFileSize) {
                throw new Exception("El archivo es demasiado grande. Tamaño máximo: 5MB");
            }

            // Crear directorio si no existe
            if (!is_dir($this->imageUploadDir)) {
                mkdir($this->imageUploadDir, 0755, true);
            }

            // Generar nombre único
            $extension = $this->getExtensionFromMime($mimeType);
            $filename = uniqid() . '_' . $this->sanitizeFileName($file['name']) . $extension;
            $filePath = $this->imageUploadDir . $filename;

            // Mover archivo
            if (!move_uploaded_file($file['tmp_name'], $filePath)) {
                throw new Exception("No se pudo guardar la imagen en el servidor");
            }

            // Eliminar imagen anterior si existe
            if ($currentImage && file_exists($currentImage)) {
                $this->deleteImage($currentImage);
            }

            return $filePath;

        } catch (Exception $e) {
            throw new Exception("Error al procesar imagen: " . $e->getMessage());
        }
    }

    /**
     * Eliminar una imagen
     */
    public function deleteImage($filePath)
    {
        try {
            if ($filePath && file_exists($filePath)) {
                if (unlink($filePath)) {
                    return true;
                }
                throw new Exception("No se pudo eliminar el archivo");
            }
            return false; // No hay archivo que eliminar
        } catch (Exception $e) {
            throw new Exception("Error al eliminar imagen: " . $e->getMessage());
        }
    }

    /**
     * Obtener extensión desde el tipo MIME
     */
    private function getExtensionFromMime($mimeType)
    {
        $extensions = [
            'image/jpeg' => '.jpg',
            'image/png' => '.png',
            'image/gif' => '.gif',
            'image/webp' => '.webp'
        ];
        
        return $extensions[$mimeType] ?? '.jpg';
    }

    /**
     * Sanitizar nombre de archivo
     */
    private function sanitizeFileName($filename)
    {
        $filename = pathinfo($filename, PATHINFO_FILENAME);
        $filename = preg_replace('/[^a-zA-Z0-9_-]/', '_', $filename);
        return substr($filename, 0, 100);
    }

    /**
     * Obtener mensaje de error de subida
     */
    private function getUploadError($errorCode)
    {
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'El archivo excede el tamaño permitido por el servidor',
            UPLOAD_ERR_FORM_SIZE => 'El archivo excede el tamaño permitido por el formulario',
            UPLOAD_ERR_PARTIAL => 'El archivo fue solo parcialmente subido',
            UPLOAD_ERR_NO_FILE => 'No se seleccionó ningún archivo',
            UPLOAD_ERR_NO_TMP_DIR => 'No existe directorio temporal',
            UPLOAD_ERR_CANT_WRITE => 'No se pudo escribir el archivo en el disco',
            UPLOAD_ERR_EXTENSION => 'Una extensión de PHP detuvo la subida del archivo'
        ];
        
        return $errors[$errorCode] ?? 'Error desconocido';
    }
}