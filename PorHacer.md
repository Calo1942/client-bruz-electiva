#### Presiona **Ctrl+Mayus+v** para visualizar

- [Listo] Desarrollar el modulo de Producto
- Corregir todo lo que tenga con la Variante en lugar Inventario
- Implementar vista de Error 404

Modificaciones Un_Carlos:

- implementación del patrón de diseño "Composición sobre Herencia" en DBConnect
- Corrección de Implementacion de la carga de ConfigSystem en el Composer para la carga automática de las constantes del sistema

Correciones del Case Sensitive Un_Carlos:

- Convenciones de Nomenclatura en PHP MVC
  Controladores (Controllers) y Modelos (Models)
  Los nombres de los archivos para Controladores y Modelos siempre deben ir en PascalCase (también conocido como StudlyCaps), comenzando con mayúscula. Esto se debe a que representan clases, y es una práctica común en la programación orientada a objetos que los nombres de las clases empiecen con mayúscula.

Ejemplos de Controladores: CategoryController.php, ClientController.php.
Ejemplos de Modelos: CategoryModel.php, ClientModel.php.

**NOTA:** Estudiar todos los patrones de diseño implementandos en el código

---

# Por Hacer (04/09/2025)

Lista de tareas (Realizar en este orden):

1. **Manejo y Retorno de Errores al Front-end**
2. **Implementar Validaciones de Formularios en el Backend**
3. **Corregir los Módulos Existentes**
4. **Implementar Manejo de Imágenes**
5. **Terminar de Crear los Módulos Faltantes**
6. **Generar documentación para el desarrollador Front**

El Porqué de este Orden:

### 1. Manejo y Retorno de Errores al Front-end

¿Por qué primero? Porque es la base de la comunicación entre tu backend y el frontend. Sin un sistema claro para
reportar errores, no podrás depurar eficazmente los siguientes pasos. Cada vez que una validación falle o una imagen no
se pueda subir, necesitarás una forma estandarizada de decirle al usuario (y a ti mismo) qué salió mal.

Acciones concretas:

- Crear una respuesta JSON estandarizada desde tus controladores (ej. {"status": "error", "message": "El campo nombre es
  obligatorio"}).
- Asegurarte de que tu código JavaScript en el frontend pueda recibir e interpretar estas respuestas para mostrar alertas
  o mensajes al usuario.

### 2. Implementar Validaciones de Formularios en el Backend

¿Por qué segundo? Porque la integridad de tus datos es crucial. Las validaciones aseguran que solo datos correctos y
seguros lleguen a tu base de datos. Al hacerlo después de manejar los errores, ya tendrás el mecanismo listo para
notificar al frontend sobre cualquier campo que no cumpla con las reglas (ej. email inválido, contraseña muy corta,
campos vacíos).

Acciones concretas:

- En tus controladores (como ProductController.php), antes de llamar al modelo para guardar o actualizar, revisa los
  datos que llegan por $\_POST.
- Valida que los campos no estén vacíos, que tengan el formato correcto y la longitud adecuada. Si algo falla, usas el
  sistema de errores del paso 1 para devolver una respuesta.

### 3. Corregir los Módulos Existentes

¿Por qué tercero? Ahora que tienes un sistema de errores y validación, puedes aplicarlo a lo que ya existe. Esto te
permite estabilizar y asegurar la base de tu aplicación antes de añadir más funcionalidad. Es más eficiente corregir 5
módulos ahora que tener que volver a corregir 10 módulos después porque todos se construyeron sobre una base con fallos.

Acciones concretas:

- Revisa los controladores de Category, Client, Product, etc.
- Integra las validaciones del paso 2 en sus métodos de crear y actualizar.
- Asegúrate de que todos retornen errores de forma estandarizada como definiste en el paso 1.

### 4. Implementar Manejo de Imágenes

¿Por qué cuarto? El manejo de archivos es una funcionalidad compleja que se apoya en los puntos anteriores. Necesitarás
validar el archivo (tamaño, tipo de imagen) y manejar posibles errores (fallo al subir, permisos de carpeta
incorrectos). Como ya tienes la base de validación y errores, integrar el manejo de imágenes será mucho más limpio y
seguro.

Acciones concretas:

- Modificar los controladores y modelos que necesiten imágenes (como ProductController y ProductModel).
- Añadir lógica para procesar el array $\_FILES.
- Validar el tipo de archivo, tamaño y errores de subida.
- Mover el archivo a su carpeta de destino (ej. src/storage/img/products/) con un nombre único para evitar colisiones.
- Guardar el nombre del archivo en la base de datos.

### 5. Terminar de Crear los Módulos Faltantes

¿Por qué al final? Porque en este punto ya tendrás un "plano" o un patrón de trabajo sólido y probado. Crear nuevos
módulos será mucho más rápido y consistente, ya que solo tendrás que replicar la estructura que definiste y
perfeccionaste en los pasos anteriores (errores, validación, manejo de imágenes).
