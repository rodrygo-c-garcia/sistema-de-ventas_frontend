<script setup lang="ts">
import type { Producto, Imagen } from '../types';
import { ref, inject, toRefs, watch, computed } from 'vue'
import * as apiCategoria from '@/services/categoria.service'
import * as apiProducto from '@/services/producto.service'
import * as imgService from '@/services/imagen.service'
import { useToast } from 'primevue/usetoast';
import LoaderView from '../LoaderView.vue'
// Props
const props = defineProps({
  prod: {
    type: Object as () => Producto,
    required: true
  }
});

const { prod: producto } = toRefs(props);
const imagen = ref<Imagen>({
  url: '',
  delete_url: ''
})

// VARIBLES
const toast = useToast();
const submitted = ref<boolean>(false);
const display = ref(inject<boolean>('display'));

const categorias = ref<Array<any>>([]);
const actualizar_productos = ref(inject<boolean>('actualizar_productos'));
const img_miniatura = ref<string>('');
// para leer archivos en este caso imagenes
const reader = new FileReader()
const imgBB = ref<string>('');
const categoria_loading = ref<boolean>(false)
const loading_conexion_API = ref<boolean>(false)


// FUNCIONES

async function ObtenerCategorias() {
  if (!categoria_loading.value) {
    const { data } = await apiCategoria.getCategorias();
    categorias.value = data
    categoria_loading.value = true
  }
}

const closeDialog = (): void => {
  display.value = false;
  submitted.value = false;
};

watch(display, asignarValores)
watch(display, ObtenerCategorias)

function asignarValores(): void {
  if (!display.value) {
    reader.abort()
    img_miniatura.value = ''
    imgBB.value = ''
  }
}

const saveProduct = async () => {
  submitted.value = true;
  try {
    validateRequiredFields();
    // Si el ID existe actualizamos
    if (producto.value.id) putProducto();
    else { // Caso contrario creamos nuevo Producto
      if (imgBB.value === '') {
        showError('Seleccione una imagen');
      } else {
        postProducto();
      }
    }
    display.value = false;
  } catch (error: unknown) {
    showError((error as Error).message)
  }
}

const validateRequiredFields = () => {
  if (!producto.value.nombre.trim()) {
    throw new Error('Llene el campo Nombre');
  }

  if (!producto.value.stock) {
    throw new Error('El campo Stock no puede ir vacio');
  }

  if (!producto.value.categoria_id) {
    throw new Error('Seleccione una Categoria');
  }
}

const showError = (message: string) => {
  toast.add({ severity: 'warn', summary: message, detail: 'Obligatorio', life: 3000 });
}

async function postProducto() {
  try {
    // mostrar el modal
    loading_conexion_API.value = true;
    // Guardamos la imagen en la API de ImgBB
    await uploadImagen();
    const { data } = await imgService.postImagen(imagen.value)
    producto.value.imagen_id = data.data.id
    apiProducto.postProducto(producto.value)

    toast.add({ severity: 'success', summary: 'Exito', detail: 'Producto Guardado', life: 3000 });
    actualizar_productos.value = true
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al registrar', life: 3000 });
  } finally {
    // ocultar el modal
    loading_conexion_API.value = false;
  }
}

async function uploadImagen() {
  // Guardamos la imagen en la API de ImgBB
  const response = await imgService.uploadIMG(imgBB.value)
  imagen.value.url = response.data.thumb.url
  imagen.value.delete_url = response.data.delete_url
}


async function putProducto() {
  try {
    loading_conexion_API.value = true;
    if (imgBB.value) {
      await uploadImagen();
      await imgService.updateImagen(imagen.value, producto.value.imagen_id)
    }
    // Esperar a que se resuelva la promesa
    await apiProducto.putProducto(producto.value, producto.value.id);

    toast.add({ severity: 'success', summary: 'Exito', detail: 'Producto Actualizado', life: 3000 });
    actualizar_productos.value = true
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al Actualizar', life: 3000 });
  } finally {

    loading_conexion_API.value = false;
  }
}

function leerIMG(e: any): void {
  if (e && e.target && e.target.files && e.target.files[0]) {
    imgBB.value = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e: any) => {
      img_miniatura.value = e.target.result;
    }
  }
}

// add metod computed for imagen minuature
const imagen_min = computed(() => {
  return img_miniatura
})

</script>

<script lang="ts">
export default {
  name: 'ProductoDialog'
}
</script>
<template>
  <Toast />
  <LoaderView msg="Cargando" :visible="loading_conexion_API" />

  <Dialog v-model:visible="display" :style="{ width: '450px' }"
    :header="producto.id ? 'Modificar Producto' : 'Registrar Producto'" :modal="true" class="p-fluid">
    <div class="field">
      <div class="container-img-edit">
        <img :src="producto.imagen?.url" :alt="producto.imagen?.url" class="product-image" v-if="producto.imagen?.url" />
      </div>
      <label for="name">Nombre</label>
      <InputText id="name" v-model.trim="producto.nombre" required="true" autofocus />
    </div>
    <div class="container-img-upload">
      <button class="btn-upload">
        <i class="pi pi-image" style="font-size: 1.5rem"></i>
        <label for="btn-img">{{ producto.imagen?.url ? "Nueva Imagen" : "Subir Imagen" }}</label>
      </button>
      <input id="btn-img" class="btn-img" size="1048576" type="file" accept="image/*" @change="leerIMG" />
      <figure>
        <img v-if="imagen_min.value !== ''" class="img-miniatura" :src="imagen_min.value" alt="Imagen del producto">
        <p v-else>Miniatura de tu producto</p>
      </figure>
    </div>
    <div class="field">
      <label for="cod_barras">Codigo de Barras</label>
      <InputText id="cod_barras" v-model="producto.cod_barras" required="true" />
    </div>
    <div class="field">
      <Dropdown v-model="producto.categoria_id" :options="categorias" optionLabel="nombre" optionValue="id"
        placeholder="Seleccione una categoria" />
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Precio Compra</label>
        <InputNumber inputId="horizontal" v-model="producto.precio_compra" showButtons buttonLayout="horizontal"
          :step="0.50" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"
          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="currency" currency="USD" locale="en-US"
          :min="0" :max="500" />
      </div>
      <div class="field col">
        <label for="quantity">Precio Venta</label>
        <InputNumber inputId="horizontal" v-model="producto.precio_venta" showButtons buttonLayout="horizontal"
          :step="0.50" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"
          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="currency" currency="USD" locale="en-US"
          :min="0" :max="500" />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="minmax">Stock</label>
        <InputNumber inputId="minmax-buttons" v-model="producto.stock" mode="decimal" showButtons :min="0" :max="100" />
      </div>
      <div class="field col">
        <div class="card">
          <p class="utilidad"> {{ (producto.precio_venta - producto.precio_compra > 0) ? `Utilidad:
            $${producto.precio_venta -
            producto.precio_compra}` : 'Sin utilidad' }}</p>
          <p> {{ (producto.precio_venta - producto.precio_compra > 0) ? `Utlidad Total:
            $${(producto.precio_venta -
              producto.precio_compra) * producto.stock}` : '' }}</p>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-danger" @click="closeDialog" />
      <Button label="Save" icon="pi pi-check" class="p-button-primary" @click="saveProduct" />
    </template>
  </Dialog>
</template>

<style>
.utilidad {
  font-size: 16px;
}

.container-img-upload,
.btn-upload,
.container-img-edit {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-img-upload {
  padding: 10px;
}

.btn-img {
  display: none;
  appearance: none;
  opacity: hidden;
}

.img-miniatura {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 7px #000;
}

.btn-upload {
  background-color: rgb(41, 110, 238);
  padding: 10px;
  color: #fff;
  width: 40%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-upload:hover {
  background-color: rgb(78, 127, 216);
  transform: scale(1.02);
}

.pi-image {
  margin-right: 10px;
}
</style>