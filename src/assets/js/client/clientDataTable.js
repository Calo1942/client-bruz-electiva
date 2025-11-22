// clientDataTable.js (adaptado)
import {
  createDataTable,
  reloadDataTable,
  createActionsColumn,
} from "../helpers/dataTable.js";
import {
  getById,
  create,
  update,
  remove,
  executeAjax,
} from "../helpers/ajax.js";
import {
  showConfirm,
  showLoading,
  closeLoading,
} from "../helpers/sweetalert.js";
import { animateIn } from "../helpers/animations.js";
import { showSkeleton, hideSkeleton } from "../helpers/skeleton.js";

const API_URL = window.clientApiUrl || "";

$(document).ready(async function () {
  showSkeleton("#clientTable", "#clientTable");

  const tblClient = createDataTable(
    "#clientTable",
    API_URL,
    [
      { data: "cedula" },
      { data: "nombre" },
      { data: "apellido" },
      { data: "correo" },
      { data: "telefono" },
      createActionsColumn({
        idField: "cedula",
        btnVer: true,
        btnEditar: true,
        btnEliminar: true,
      }),
    ],
    {
      initComplete: function () {
        $(".dataTables_filter input").attr("placeholder", "Buscar...");
        setTimeout(() => {
          hideSkeleton(".skeleton-table", "#clientTable");
          animateIn("#clientTable", 400, 100);
        }, 800);
      },
    }
  );

  $(document).on("click", ".btn-agregar", function () {
    $("#formAgregarCliente")[0].reset();
    $("#formAgregarCliente")
      .find(".is-valid, .is-invalid")
      .removeClass("is-valid is-invalid");
    $("#agregarClienteModal").modal("show");
  });

  $(document).on("click", ".btn-ver", async function () {
    const cedula = this.value;

    await executeAjax(getById(API_URL, cedula), null, (response) => {
      $("#verCedula").text(response.data.cedula);
      $("#verNombre").text(response.data.nombre);
      $("#verApellido").text(response.data.apellido);
      $("#verCorreo").text(response.data.correo);
      $("#verTelefono").text(response.data.telefono);
      $("#verClienteModal").modal("show");
    });
  });

  $(document).on("click", ".btn-eliminar", async function () {
    const cedula = this.value;

    const confirmed = await showConfirm(
      "¿Estás seguro?",
      "¿Está seguro de eliminar este cliente?"
    );

    if (confirmed) {
      await executeAjax(
        remove(API_URL, cedula),
        "Cliente eliminado correctamente",
        () => reloadDataTable(tblClient)
      );
    }
  });

  $("#agregarClienteModal").on("hidden.bs.modal", () => {
    reloadDataTable(tblClient);
  });
});
