# Helpers Documentation

Este directorio contiene módulos de utilidad para diversas funcionalidades en la aplicación. A continuación se describe el propósito y uso de cada archivo.

## Archivos

### `accessibility.js`

Maneja mejoras de accesibilidad, específicamente corrigiendo el atributo `aria-hidden` en el contenedor principal cuando se abren y cierran modales de Bootstrap.

**Funciones principales:**

- `initAccessibility()`: Inicializa los listeners para los eventos de modales.

### `ajax.js`

Un wrapper alrededor de `$.ajax` de jQuery para simplificar las peticiones HTTP. Maneja automáticamente `FormData`, respuestas JSON mixtas (JSON dentro de HTML), y errores comunes.

**Funciones principales:**

- `getAll(url)`: Petición POST con `{ getAll: true }`.
- `getById(url, id)`: Petición POST con `{ show: id }`.
- `remove(url, id)`: Petición POST con `{ delete: id }`.
- `create(url, data, options)`: Petición POST para crear registros. Agrega automáticamente `store: 1`.
- `update(url, data, options)`: Petición POST para actualizar registros. Agrega automáticamente `update: 1`.
- `executeAjax(promise, successMsg, onSuccess)`: Ejecuta una promesa AJAX y maneja la respuesta (éxito/error) y notificaciones.

### `animations.js`

Proporciona utilidades para animaciones simples utilizando jQuery.

**Funciones principales:**

- `animateIn(selector, duration, delay)`: Muestra un elemento con una animación de entrada (fade in + slide up).
- `pulse(selector)`: Aplica una animación de pulso a un elemento (útil para errores de validación).

### `dataTable.js`

Configuración y helpers para inicializar DataTables de manera consistente.

**Funciones principales:**

- `createDataTable(tableId, url, columns, customConfig)`: Inicializa una DataTable con configuración por defecto y carga AJAX.
- `createActionsColumn(options)`: Genera la configuración para una columna de acciones (Ver, Editar, Eliminar).
- `reloadDataTable(dataTable)`: Recarga los datos de la tabla.

### `imagePreview.js`

Maneja la previsualización de imágenes en inputs de tipo file.

**Funciones principales:**

- `setupImagePreview(inputSelector, previewSelector, options)`: Configura el listener para mostrar la imagen seleccionada. Valida tipo y tamaño.
- `clearPreview(previewSelector, inputSelector)`: Limpia la previsualización y el input.

### `regexp.js`

Contiene expresiones regulares reutilizables para validaciones.

**Exportaciones:**

- `regExp`: Objeto con patrones para `texto`, `nombreApellido`, `cantidad`, `telefono`, `email`, `cedula`, `precio`, `stock`, etc.

### `skeleton.js`

Controla la visualización de "esqueletos" de carga (placeholders) mientras se obtienen datos.

**Funciones principales:**

- `showSkeleton(skeletonSelector, hideSelector)`: Muestra el skeleton y oculta el contenido real.
- `hideSkeleton(skeletonSelector, showSelector)`: Oculta el skeleton y muestra el contenido real.

### `sweetalert.js`

Wrapper para SweetAlert2 que estandariza los estilos y tipos de alertas en la aplicación.

**Funciones principales:**

- `showSuccess(title, text, ...)`: Alerta de éxito.
- `showError(title, text, ...)`: Alerta de error.
- `showWarning(title, text, ...)`: Alerta de advertencia.
- `showConfirm(title, text, ...)`: Alerta de confirmación (retorna promesa).
- `showLoading(title, text)`: Muestra spinner de carga.
- `closeLoading()`: Cierra la alerta de carga.

### `validation.js`

Lógica de validación de formularios utilizando las expresiones regulares de `regexp.js`.

**Funciones principales:**

- `validarNombre(campo)`, `validarApellido(campo)`, `validarEmail(campo)`, etc.: Validan un campo específico y actualizan su estado visual (`is-valid` / `is-invalid`).
- `validarFecha(campo)`: Valida que la fecha no sea anterior a hoy.
- `validarPrecio(campo)`, `validarStock(campo)`: Validaciones numéricas específicas.

## Flujo de Trabajo Común

1. **Interacción UI**: El usuario interactúa con un formulario.
2. **Validación**: Se usan funciones de `validation.js` (que usan `regexp.js`) en eventos `input` o `change`.
3. **Envío**: Al enviar, se usa `ajax.js` (`create` o `update`).
4. **Feedback**:
   - Mientras carga: `sweetalert.js` (`showLoading`) o `skeleton.js`.
   - Respuesta: `sweetalert.js` (`showSuccess` o `showError`).
   - Animación: `animations.js` (`pulse` en error).
5. **Actualización**: Si es una tabla, se usa `dataTable.js` (`reloadDataTable`).
