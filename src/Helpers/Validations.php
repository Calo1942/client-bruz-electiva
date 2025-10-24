<?php

namespace BruzDeporte\Helpers;

trait Validations
{
    // Numbers 
    public static function validate_id($data)
    {
        return (preg_match('/^[0-9]{1,}$/', $data)) ? true : false;
    }

    public static function validate_number($data)
    {
        return (preg_match('/^[0-9]{1,}$/', $data)) ? true : false;
    }

    public static function validate_telefono($data)
    {
        return (preg_match('/^[0-9]{11}$/', $data)) ? true : false;
    }

    // Texts
    public static function validate_names($data)
    {
        return (preg_match('/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{2,}$/', $data)) ? true : false;
    }

    public static function validate_text($data)
    {
        return (preg_match('/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/', $data)) ? true : false;
    }

    public static function validate_email($data)
    {
        return (preg_match('/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/', $data)) ? true : false;
    }

    // Fechas
}

/*
// Expresiones regulares para validaciones
    texto:/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/,
    nombreApellido: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/, 
    cantidad: /^[0-9]{2,11}$/,

    hoy: new Date().toISOString().split("T")[0], 
    descripcion: /^.{2,100}$/,
*/
