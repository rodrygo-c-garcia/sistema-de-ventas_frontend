import { http } from "./http.service";

export const postCliente = function(data: Object){
  return http().post('/cliente', data);
}