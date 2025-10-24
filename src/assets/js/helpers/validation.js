import { regExp } from "./regexp.js";

function validarCampo(campo, condicion) {
  if (condicion) {
    campo.removeClass("is-invalid").addClass("is-valid");
  } else {
    campo.addClass("is-invalid");
  }
}

export async function validarNombre(nombre) {
  // Nombre
  if (!regExp.nombreApellido.test(nombre.val().trim())) {
    validarCampo(nombre, false);
    return false;
  } else {
    validarCampo(nombre, true);
    return true;
  }
}

export async function validarApellido(apellido) {
  // Apellido
  if (!regExp.nombreApellido.test(apellido.val().trim())) {
    validarCampo(apellido, false);
    return false;
  } else {
    validarCampo(apellido, true);
    return true;
  }
}

export async function validarTexto(campoTexto) {

  // Texto 
  if (!regExp.texto.test(campoTexto.val().trim())) {
    validarCampo(campoTexto, false);
    return false;
  } else {
    validarCampo(campoTexto, true);
    return true;
  }
}

export async function validarDescripcion(campoDescripcion) {
  // Descripción
  if (!regExp.descripcion.test(campoDescripcion.val().trim())) {
    validarCampo(campoDescripcion, false);
    return false;
  } else {
    validarCampo(campoDescripcion, true);
    return true;
  }
}

export async function validarTelefono(telefono) {
  // telefono
  if (
    !regExp.telefono.test(telefono.val().trim()) ||
    telefono.val().trim().length < 5
  ) {
    validarCampo(telefono, false);
    return false;
  } else {
    validarCampo(telefono, true);
    return true;
  }
}

export async function validarFecha(fecha) {
  // Fecha
  if (!fecha.val() || fecha.val() < regExp.hoy) {
    validarCampo(fecha, false);
    return false;
  } else {
    validarCampo(fecha, true);
    return true;
  }
}

export async function validarHora(hora) {
  // Hora
  if (!hora) {
    validarCampo(hora, false);
    return false;
  } else {
    validarCampo(hora, true);
    return true;
  }
}

export async function validarCedula(cedula) {
  // Cédula
  if (!regExp.cedula.test(cedula.val().trim())) {
    validarCampo(cedula, false);
    return false;
  } else {
    validarCampo(cedula, true);
    return true;
  }
}

export async function validarEmail(email) {
  // Email
  if (!regExp.email.test(email.val().trim())) {
    validarCampo(email, false);
    return false;
  } else {
    validarCampo(email, true);
    return true;
  }
}
