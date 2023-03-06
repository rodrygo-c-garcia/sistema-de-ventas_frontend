export interface Producto {
    id: number,
    nombre: string;
    cod_barras: string;
    precio_compra: number;
    precio_venta: number;
    stock: number;
    categoria_id: number;
    imagen_id: string,
    imagen?: {
        id: string,
        url: string,
    }
}

export interface Categoria {
    id: number,
    nombre: string,
    detalle: string,
}

export interface Imagen {
    id: string,
    url: string,
}

