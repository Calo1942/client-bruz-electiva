# DataTable para Clientes

## Descripción
Sistema de DataTable implementado para la gestión de clientes con funcionalidades AJAX completas.

## Archivos Implementados

### 1. `clientDataTable.js`
- **Propósito**: Lógica principal del DataTable
- **Funcionalidades**:
  - Inicialización de DataTable con AJAX
  - Botones de acción (Ver, Editar, Eliminar)
  - Recarga automática después de operaciones
  - Manejo de eventos para modales

### 2. `ClientController.php` (Modificado)
- **Nuevos Endpoints AJAX**:
  - `getClients`: Obtiene todos los clientes
  - `showClient`: Obtiene un cliente específico
  - `deleteClient`: Elimina un cliente

### 3. `clientDataTable.php` (Modificado)
- **Cambios**: Tabla HTML simplificada para DataTable
- **ID**: `clientTable` para inicialización

## Configuración del DataTable

### Columnas Configuradas
```javascript
columns: [
    {data: 'cedula'},    
    {data: 'nombre'},
    {data: 'apellido'},
    {data: 'correo'},
    {data: 'telefono'},
    {data: null, render: (data) => {
        // Botones de acción
    }}
]
```

### Características
- **Idioma**: Español
- **AJAX**: Carga dinámica de datos
- **Responsive**: Tabla adaptable
- **Ordenamiento**: Habilitado para todas las columnas excepto acciones

## Funcionalidades Implementadas

### 1. Ver Cliente
- **Evento**: Click en botón "Ver"
- **Acción**: Carga datos del cliente y abre modal de visualización
- **Endpoint**: `showClient`

### 2. Editar Cliente
- **Evento**: Click en botón "Editar"
- **Acción**: Carga datos del cliente y abre modal de edición
- **Endpoint**: `showClient`

### 3. Eliminar Cliente
- **Evento**: Click en botón "Eliminar"
- **Acción**: Confirmación y eliminación del cliente
- **Endpoint**: `deleteClient`
- **Recarga**: Automática después de eliminar

### 4. Recarga Automática
- **Después de crear**: Modal de crear se cierra
- **Después de editar**: Modal de editar se cierra
- **Timeout**: 500ms para asegurar operación completa

## Endpoints AJAX

### GET Clients
```javascript
POST: src/Controllers/ClientController.php
Data: { getClients: true }
Response: Array de clientes
```

### SHOW Client
```javascript
POST: src/Controllers/ClientController.php
Data: { cedula: "12345678", showClient: true }
Response: { success: true, data: {...} }
```

### DELETE Client
```javascript
POST: src/Controllers/ClientController.php
Data: { cedula: "12345678", deleteClient: true }
Response: { success: true, message: "..." }
```

## Dependencias

### CSS
- Bootstrap 5.3.0
- DataTables Bootstrap 5 CSS

### JavaScript
- jQuery 3.6.0
- DataTables 1.13.7
- Bootstrap 5.3.0

## Estructura de Respuesta AJAX

### Éxito
```json
{
    "success": true,
    "data": {
        "cedula": "12345678",
        "nombre": "Juan",
        "apellido": "Pérez",
        "correo": "juan@email.com",
        "telefono": "3001234567"
    }
}
```

### Error
```json
{
    "success": false,
    "message": "Mensaje de error"
}
```

## Integración con Validaciones

El DataTable se integra perfectamente con el sistema de validaciones:
- Los formularios mantienen sus validaciones
- La tabla se recarga después de operaciones exitosas
- Los modales funcionan independientemente del DataTable

## Características del DataTable

### Configuración
- **Paginación**: Habilitada
- **Búsqueda**: Global y por columna
- **Ordenamiento**: Multi-columna
- **Responsive**: Adaptable a dispositivos móviles
- **Idioma**: Español completo

### Botones de Acción
- **Ver**: Icono de ojo (Bootstrap Icons)
- **Editar**: Icono de lápiz (Bootstrap Icons)
- **Eliminar**: Icono de basura (Bootstrap Icons)

## Uso

### Inicialización Automática
El DataTable se inicializa automáticamente al cargar la página.

### Recarga Manual
```javascript
tblClient.ajax.reload();
```

### Eventos Personalizados
Los eventos están configurados para funcionar con delegación de eventos, permitiendo que los botones dinámicos funcionen correctamente.
