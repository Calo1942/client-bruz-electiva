// validation.js
import { regExp } from "./regexp.js";

const validarCampo = (campo, esValido) => {
    campo.toggleClass("is-valid", esValido).toggleClass("is-invalid", !esValido);
};

const crearValidador = (regex, campo) => {
    const valor = campo.val().trim();
    const esValido = regex.test(valor);
    validarCampo(campo, esValido);
    return esValido;
};

export const validarNombre = (nombre) => crearValidador(regExp.nombreApellido, nombre);
export const validarApellido = (apellido) => crearValidador(regExp.nombreApellido, apellido);
export const validarTexto = (campoTexto) => crearValidador(regExp.texto, campoTexto);
export const validarDescripcion = (descripcion) => crearValidador(regExp.descripcion, descripcion);
export const validarTelefono = (telefono) => crearValidador(regExp.telefono, telefono);
export const validarCedula = (cedula) => crearValidador(regExp.cedula, cedula);
export const validarEmail = (email) => crearValidador(regExp.email, email);

export const validarFecha = (fecha) => {
    const esValido = fecha.val() && fecha.val() >= regExp.hoy;
    validarCampo(fecha, esValido);
    return esValido;
};

export const validarPrecio = (precio) => {
    const valor = precio.val().trim();
    const esValido = regExp.precio.test(valor) && parseFloat(valor) > 0;
    validarCampo(precio, esValido);
    return esValido;
};

export const validarStock = (stock) => {
    const valor = stock.val().trim();
    const esValido = regExp.stock.test(valor) && parseInt(valor) >= 0;
    validarCampo(stock, esValido);
    return esValido;
};

export const validarCategoria = (categoria) => {
    const valor = categoria.val();
    const esValido = valor && valor !== '' && valor !== '0';
    validarCampo(categoria, esValido);
    return esValido;
};