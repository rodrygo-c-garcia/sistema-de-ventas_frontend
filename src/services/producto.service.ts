import { http } from './http.service'

export const getProductos = function(){
  return http().get(`/producto`)
} 

export const postProducto = function(data: object): Object {
  return http().post(`/producto`, data)
}

export const putProducto = function(data: object, id: number): Object{
  return http().put(`/producto/${id}`, data)
}

export const deleteProducto = function(id: number): Object {
  return http().delete(`/producto/${id}`)
}