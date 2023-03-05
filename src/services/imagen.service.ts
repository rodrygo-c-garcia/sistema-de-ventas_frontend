import { httpFile, http } from "./http.service";

// API ImgBB
export const getImageInfo = (id: any) => {
  return httpFile().get(`image/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching image info: ${error}`);
      throw error;
    });
};

export const uploadIMG =  function(data: any ){
   const formData = new FormData();
  formData.append("image", data);

  return httpFile().post(`upload`, formData)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error en carga de imagen: ${error}`);
      throw error;
    });
}

export const updateImage = (id: any, data: any) => {
  return httpFile().put(`image/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error updating image: ${error}`);
      throw error;
    });
};

export const deleteImage = (id: any) => {
  return httpFile().delete(`image/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error delete image: ${error}`);
      throw error;
    });
};

// Base de Datos

export const postImagen = function(data: any) {
  return http().post(`/imagen`, data)
}