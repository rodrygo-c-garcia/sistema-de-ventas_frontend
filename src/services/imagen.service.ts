import { httpFile, http } from "./http.service";

// API ImgBB
export const uploadIMG =  function(data: any ){
   const formData = new FormData();
  formData.append("image", data);

  return httpFile().post(``, formData)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error en carga de imagen: ${error}`);
      throw error;
    });
}

// Base de Datos

export const postImagen = function(data: any) {
  return http().post(`/imagen`, data)
}

export const updateImagen = function(data: any, id: number) {
  return http().put(`/imagen/${id}`, data);
}