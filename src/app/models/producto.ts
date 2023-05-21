export class Producto {
    _id?: number;
    nombre: string;
    categoria: string;
    origen: string;
    precio: number;

    constructor(nombre: string, categoria: string, origen: string, precio: number) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.origen = origen;
        this.precio = precio;
    }
}