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