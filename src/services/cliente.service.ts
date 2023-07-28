import { http } from "./http.service";

export const postCliente = function(data: Object){
  return http().post('/cliente', data);
}

export const lookingForCustomer = function(termino: string){
  return http().get(`searchCustomer?search=${termino}`);
}