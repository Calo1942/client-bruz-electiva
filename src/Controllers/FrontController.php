<?php

namespace BruzDeporte\Controllers;

class FrontController {
    private $url;
    private $controller;
    private $method;
    private $params;

    // Constructor: procesa la URL
    public function __construct() {
        //$this->url = $_GET['url'] ?? 'client';
        $this->url = 'client';
        $this->parseUrl();
    }

    // Analiza la URL para separar controlador, método y parámetros
    private function parseUrl() {
        $url = explode('/', filter_var(rtrim($this->url, '/'), FILTER_SANITIZE_URL));
        $this->controller = $url[0] ?? 'client';
        $this->method = $url[1] ?? '';
        $this->params = array_slice($url, 2);
    }

    // Ejecuta la lógica principal: incluye el archivo del controlador
    public function run() {
        $controllerFile = __DIR__ . '/' . ucfirst($this->controller) . 'Controller.php';
        if (file_exists($controllerFile)) {
            require $controllerFile;
        } else {
            throw new \Exception("Controlador {$this->controller} no encontrado");
        }
    }
}