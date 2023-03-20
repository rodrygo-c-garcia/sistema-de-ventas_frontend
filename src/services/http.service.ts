import axios from 'axios';
import { url_base } from '@/config/index'

export function http() {
  let token : string = "";
  try{
    token = window.atob(localStorage.getItem('token') ?? '');
  } catch(e){}

  const instance = axios.create({
    baseURL: url_base,
    headers: {
      Accept: "application/json",
      "Content-Type": 'application/json',
      Authorization: "Bearer " + token
    }
  });

  // verificar errores antes de realizar cualquier otra peticion
  instance.interceptors.response.use(
    (respone) => {
      return respone
    },
    (error) => {
      //limipiamos el localStorage
      localStorage.clear();
      // Redireccionamos al login en caso de errores de no autenticacion
      window.location.href = "/login";
      // redireccionamos al login cuando hay un error
      return Promise.reject(error);
    }
  )
return instance
}


export function httpFile() {
  return axios.create({
    baseURL: `https://api.imgbb.com/1/upload`,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
    params: {
      key: import.meta.env.VITE_API_KEY,
    },
  });
}