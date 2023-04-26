import { http } from './http.service'

export const getProductos = function(){
  return http().get(`/producto`)
} 

// funcion para obtener resultados de la busqueda
export const searchingProducto = function(termino: String){
  return http().get(`search?search=${termino}`)
}

export const postProducto = function(data: any): Object {
  return http().post(`/producto`, data)
}

export const putProducto = function(data: object, id: number): Object{
  return http().put(`/producto/${id}`, data)
}

export const deleteProducto = function(id: number): Object {
  return http().delete(`/producto/${id}`)
}