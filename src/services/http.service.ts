import axios from 'axios';
import { url_base } from '@/config/index'

export function http() {
  const instance = axios.create({
    baseURL: url_base,
    headers: {
      Accept: "application/json",
      "Content-Type": 'application/json'
    }
  });

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