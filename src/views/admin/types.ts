export interface Producto {
    id: number,
    nombre: string;
    cod_barras: string;
    precio_compra: number;
    precio_venta: number;
    stock: number;
    categoria_id: number;
}

export interface Categoria {
    id: number,
    nombre: string,
    detalle: string,
}
