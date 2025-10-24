<?php

    namespace BruzDeporte\config\connect;
    use PDO;
    use PDOException;

    abstract class DBConnect {      // Tiene un PDO, No extiende de (no es un) PDO
        
        protected $con;
        private $local;
        private $nameDB;
        private $user;
        private $pass;
        private $charset;

        public function __construct()
        {
            $this->local = __LOCAL__;
            $this->nameDB = __DB_NAME__;
            $this->user = __USER__;
            $this->pass = __PASS__;
            $this->charset = __CHARSET__;

            // Opciones para el comportamiento de PDO (NOTA: Investigar estas opciones)
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,          
                PDO::ATTR_EMULATE_PREPARES   => false,                     
            ];

            try {
                $dsn = "mysql:host={$this->local};dbname={$this->nameDB};charset={$this->charset}";     // Data Source Name (DSN)
                $this->con = new PDO($dsn, $this->user, $this->pass, $options);
            } catch (PDOException $e) {
                throw new PDOException("Error de conexión: " . $e->getMessage(), (int)$e->getCode(), $e);   // Investigar a profundidad esta línea
            }
        }
    }

// NOTA: Esta conexión de la base de datos fue la propuesta por el profesor en el video. Tiene algunas correciones y mejoras.
