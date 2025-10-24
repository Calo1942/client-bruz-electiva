# Validaciones de Formularios de Cliente

## Descripción
Este sistema de validaciones proporciona validación en tiempo real para los formularios de crear y editar clientes.

## Archivos Involucrados

### 1. `validationClient.js`
- **Propósito**: Contiene la lógica principal de validación para los formularios de cliente
- **Funcionalidades**:
  - Validación en tiempo real (al perder el foco del campo)
  - Validación completa al enviar el formulario
  - Control de estado de botones de envío
  - Limpieza de validaciones al cerrar modales

### 2. `helpers/validation.js`
- **Propósito**: Contiene funciones de validación reutilizables
- **Funciones agregadas**:
  - `validarCedula()`: Valida formato de cédula (7-15 dígitos)
  - `validarEmail()`: Valida formato de email

### 3. `helpers/regexp.js`
- **Propósito**: Contiene expresiones regulares para validaciones
- **Actualizaciones**:
  - Agregada expresión regular para cédula: `/^[0-9]{7,15}$/`
  - Actualizada expresión regular para teléfono: `/^[0-9+\-\s()]{10,25}$/`

## Validaciones Implementadas

### Formulario de Crear Cliente
- **Cédula**: Solo números, entre 7 y 15 dígitos
- **Nombre**: Solo letras y espacios, entre 2 y 15 caracteres
- **Apellido**: Solo letras y espacios, entre 2 y 15 caracteres
- **Email**: Formato de email válido
- **Teléfono**: Números, guiones, paréntesis y espacios, entre 10 y 25 caracteres

### Formulario de Editar Cliente
- **Nombre**: Solo letras y espacios, entre 2 y 15 caracteres
- **Apellido**: Solo letras y espacios, entre 2 y 15 caracteres
- **Email**: Formato de email válido
- **Teléfono**: Números, guiones, paréntesis y espacios, entre 10 y 25 caracteres

## Características del Sistema

### Validación en Tiempo Real
- Los campos se validan cuando el usuario sale del campo (evento `blur`)
- Se muestran clases CSS `is-valid` o `is-invalid` según el resultado
- Los botones de envío se habilitan/deshabilitan automáticamente

### Control de Estado
- Se mantiene un objeto de estado para cada formulario
- Solo se permite el envío cuando todos los campos son válidos
- Se limpia el estado al cerrar los modales

### Prevención de Envío
- Se valida todo el formulario antes del envío
- Se muestra alerta si hay errores
- Solo se envía si todas las validaciones son correctas

## Uso

### Inclusión en HTML
```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Script de validaciones -->
<script type="module" src="../../assets/js/validationClient.js"></script>
```

### Inicialización Automática
Las validaciones se inicializan automáticamente cuando el documento está listo.

## Dependencias
- jQuery 3.6.0+
- Bootstrap 5.3.0+
- Módulos ES6 (import/export)

## Estilos CSS
El sistema utiliza las clases de Bootstrap:
- `is-valid`: Campo válido (borde verde)
- `is-invalid`: Campo inválido (borde rojo)

## Mensajes de Error
Los mensajes de error se muestran a través de:
- Clases CSS de Bootstrap
- Alertas JavaScript para errores generales
- Atributos `title` en los campos HTML para mensajes específicos
