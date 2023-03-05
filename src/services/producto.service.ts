import { http, httpFile } from './http.service'

export const getProductos = function(){
  return http().get(`/producto`)
} 

export const postProducto = function(data: any): Object {
  let formData = new FormData();
  formData.append('id', data.id);
  formData.append('nombre', data.nombre);
  formData.append('cod_barras', data.cod_barras);
  formData.append('precio_compra', data.precio_compra);
  formData.append('precio_venta', data.precio_venta);
  formData.append('stock', data.stock);
  formData.append('categoria_id', data.categoria_id);
  formData.append("imagen", data.imagen);

  return httpFile().post(`/producto`, formData)
}

export const putProducto = function(data: object, id: number): Object{
  return http().put(`/producto/${id}`, data)
}

export const deleteProducto = function(id: number): Object {
  return http().delete(`/producto/${id}`)
}