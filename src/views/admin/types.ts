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

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CarritoItem {
  id: number;
  nombre: string;
  precio: number;
  sub_total: number;
  cantidad: number;
  stock: number
}

// Para el Toast
export const severety = {
  SUCCESS: 'success',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
}
