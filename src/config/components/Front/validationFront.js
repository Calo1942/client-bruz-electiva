$(document).ready(function() {
  // Validación en tiempo real
  $("input[data-validar]").on("input", function() {
    const tipo = $(this).data("validar");
    let valor = $(this).val();

    if (tipo === "texto") {
      // Permite letras, números, espacios, ñ/Ñ y acentos
      valor = valor.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]/g, "");
    } else if (tipo === "numero") {
      valor = valor.replace(/[^0-9]/g, "");
    } else if (tipo === "email") {
      valor = valor.replace(/\s/g, ""); // elimina espacios
    }

    $(this).val(valor);

    // Marca error si está vacío
    if (valor.trim() === "") {
      $(this).addClass("is-invalid");
    } else {
      $(this).removeClass("is-invalid");
    }
  });

  // Validación al enviar formulario
  $("form.needs-validation").on("submit", function(e) {
    let valido = true;

    $(this).find("input[data-validar]").each(function() {
      const tipo = $(this).data("validar");
      let valor = $(this).val();

      if (tipo === "texto") valor = valor.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]/g, "");
      if (tipo === "numero") valor = valor.replace(/[^0-9]/g, "");
      if (tipo === "email") valor = valor.replace(/\s/g, "");

      $(this).val(valor);

      if (valor.trim() === "") {
        $(this).addClass("is-invalid");
        valido = false;
      } else {
        $(this).removeClass("is-invalid");
      }
    });

    if (!valido) {
      e.preventDefault(); // bloquea envío si hay errores
    }

    $(this).addClass("was-validated");
  });
});