export interface Producto {
    id: number,
    nombre: string;
    cod_barras: string;
    precio_compra: number;
    precio_venta: number;
    stock: number;
    categoria_id: number;
    imagen_id: number,
    imagen?: {
        url: string,
        delete_url: string
    }
}

export interface Categoria {
    id: number,
    nombre: string,
    detalle: string,
}

export interface Imagen {
    url: string,
    delete_url: string
}

