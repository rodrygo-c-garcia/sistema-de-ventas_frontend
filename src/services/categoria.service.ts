import { http } from './http.service'

export const getCategorias = function (){
  return http().get(`/categoria`);
}

export const postCategoria = function (data: object){
  return http().post('/categoria', data);
}

export const putCategoria = function (data: object, id: number){
  return http().put(`/categoria/${id}`, data);
}

export const deleteCategoria = function(id: number){
  return http().delete(`/categoria/${id}`)
}