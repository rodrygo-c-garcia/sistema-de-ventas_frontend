import { http } from "./http.service";

export function login(data: any){
  return http().post('/login', data)
}