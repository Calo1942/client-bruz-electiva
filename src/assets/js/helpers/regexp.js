export const regExp = {

    // Expresiones regulares para validaciones
    texto:/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/,
    nombreApellido: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/, 
    cantidad: /^[0-9]{2,11}$/,               
    telefono: /^[0-9]{10}$/,                
    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    cedula: /^[0-9]{7,15}$/,
    hoy: new Date().toISOString().split("T")[0], 
    descripcion: /^.{2,100}$/,
}