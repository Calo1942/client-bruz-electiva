export const regExp = {

    // Expresiones regulares para validaciones
    texto:/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/,
    nombreApellido: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/, 
    cantidad: /^[0-9]{2,11}$/,               
    telefono: /^[0-9]{10}$/,                
    //email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    cedula: /^[0-9]{7,15}$/,
    hoy: new Date().toISOString().split("T")[0], 
    descripcion: /^.{2,100}$/,
    precio: /^[0-9]+(\.[0-9]{1,2})?$/, // Permite decimales con hasta 2 decimales
    stock: /^[0-9]+$/, // Solo números enteros positivos
}