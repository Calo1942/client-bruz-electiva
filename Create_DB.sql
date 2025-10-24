DROP DATABASE IF EXISTS `db_bruz_deporte`;
CREATE DATABASE `db_bruz_deporte`
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;
USE `db_bruz_deporte`;

CREATE TABLE cliente (
    cedula VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE,
    telefono VARCHAR(25) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE categoria (
    id_categoria INT(4) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE banco (
    id_banco INT(4) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE talla (
    id_talla INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(5) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE producto (
    id_producto INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    stock INT(11) NOT NULL DEFAULT 0,
    precio_detal DECIMAL(10,2) NOT NULL,
    precio_mayor DECIMAL(10,2) NOT NULL,
    id_categoria INT(4) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
) ENGINE=InnoDB;

CREATE TABLE variante (
    id_variante INT(11) PRIMARY KEY AUTO_INCREMENT,
    stock INT(11) NOT NULL DEFAULT 0,
    id_producto INT(11) NOT NULL,
    id_talla INT(11) NOT NULL,
    color VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_talla) REFERENCES talla(id_talla)
) ENGINE=InnoDB;

CREATE TABLE pedido (
    id_pedido INT(11) PRIMARY KEY AUTO_INCREMENT,
    cedula VARCHAR(15) NOT NULL,
    tipo_venta VARCHAR(25) NOT NULL,
    estado_venta VARCHAR(25) NOT NULL,  /* Aquí se puede implementar un ENUM */
    estado_envio VARCHAR(25) NOT NULL,  /* Aquí se puede implementar un ENUM */
    FOREIGN KEY (cedula) REFERENCES cliente(cedula)
) ENGINE=InnoDB;

CREATE TABLE comprobante_pago (
    id_comprobante_pago INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT(11) NOT NULL,
    ref_transferencia VARCHAR(100) NOT NULL UNIQUE,
    comprobante VARCHAR(255) NOT NULL,
    id_banco INT(4) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    pago_efectivo DECIMAL(10,2) NOT NULL,
    cotizacion_dolar DECIMAL(10,2) NOT NULL,
    estado_pago VARCHAR(25) NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_banco) REFERENCES banco(id_banco)
) ENGINE=InnoDB;

CREATE TABLE pedido_item (
    id_pedido INT(11) NOT NULL,
    id_variante INT(11) NOT NULL,
    cantidad INT(11) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    es_venta_mayor BOOLEAN NOT NULL,
    PRIMARY KEY (id_pedido, id_variante),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_variante) REFERENCES variante(id_variante)
) ENGINE=InnoDB;

CREATE TABLE imagen (
    id_imagen INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre_img VARCHAR(100) NOT NULL UNIQUE,
    id_variante INT(11) NOT NULL,
    FOREIGN KEY (id_variante) REFERENCES variante(id_variante)
) ENGINE=InnoDB;

CREATE TABLE orden_fabricacion (
    id_orden_fabricacion INT(11) PRIMARY KEY AUTO_INCREMENT,
    fecha_entrega DATETIME NOT NULL,
    estado_orden VARCHAR(25) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE orden_fabricacionItem (
    id_orden_fabricacion INT(11) NOT NULL,
    id_variante INT(11) NOT NULL,
    cantidad INT(11) NOT NULL,
    PRIMARY KEY (id_orden_fabricacion, id_variante),
    FOREIGN KEY (id_orden_fabricacion) REFERENCES orden_fabricacion(id_orden_fabricacion),
    FOREIGN KEY (id_variante) REFERENCES variante(id_variante)
) ENGINE=InnoDB;

CREATE TABLE prod_personalizacion (
    id_personalizacion INT(11) PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    id_categoria INT(4) NOT NULL,
    imagen VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
) ENGINE=InnoDB;