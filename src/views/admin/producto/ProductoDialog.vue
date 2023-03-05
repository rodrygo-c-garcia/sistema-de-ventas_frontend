<script setup lang="ts">
import type { Producto } from '../types';
import { onMounted, ref, inject, toRefs, watch, computed } from 'vue'
import * as apiCategoria from '@/services/categoria.service'
import * as apiProducto from '@/services/producto.service'
import { useToast } from 'primevue/usetoast';
// Props
const props = defineProps({
  prod: {
    type: Object as () => Producto,
    required: true
  }
});

const { prod: producto } = toRefs(props);


// VARIBLES
const toast = useToast();
const submitted = ref<boolean>(false);
const display = ref(inject<boolean>('display'));

const categorias = ref<Array<any>>([]);
const actualizar_productos = ref(inject<boolean>('actualizar_productos'));
const img_miniatura = ref<string>('');
const reader = new FileReader()


// FUNCIONES
onMounted(() => {
  ObtenerCategorias()
})

async function ObtenerCategorias() {
  const { data } = await apiCategoria.getCategorias();
  categorias.value = data
}

const closeDialog = (): void => {
  display.value = false;
  submitted.value = false;
  reader.abort()
  img_miniatura.value = ''
};


const saveProduct = async () => {
  submitted.value = true;
  if (producto.value.nombre.trim()) {
    if (producto.value.stock) {
      if (producto.value.categoria_id) {
        // Si el ID existe actualizamos
        if (producto.value.id) {
          await apiProducto.putProducto(producto.value, producto.value.id)
          toast.add({ severity: 'success', summary: 'Exito', detail: 'Producto Actualizado', life: 3000 });
        } // Caso contrario creamos nuevo Producto
        else {
          await apiProducto.postProducto(producto.value)
          toast.add({ severity: 'success', summary: 'Exito', detail: 'Producto Creado', life: 3000 });
        }
        display.value = false;
        actualizar_productos.value = true
      } else toast.add({ severity: 'warn', summary: 'Seleccione una Categoria', detail: 'Obligatorio', life: 3000 });
    } else toast.add({ severity: 'warn', summary: 'El campo Stock no puede ir vacio', detail: 'Obligatorio', life: 3000 });
  } else toast.add({ severity: 'warn', summary: 'Llene el campo Nombre', detail: 'Obligatorio', life: 3000 });
}

function getImagen(e: any): void {
  producto.value.imagen = e.target.files[0]

  reader.readAsDataURL(e.target.files[0])
  reader.onload = (e: any) => {
    img_miniatura.value = e.target.result
  }

}

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
  <Dialog v-model:visible="display" :style="{ width: '450px' }"
    :header="producto.id ? 'Modificar Producto' : 'Registrar Producto'" :modal="true" class="p-fluid">
    <div class="field">
      {{ producto }}
      <label for="name">Nombre</label>
      <InputText id="name" v-model.trim="producto.nombre" required="true" autofocus />
    </div>
    <div class="field">
      <label for="cod_barras">Codigo de Barras</label>
      <InputText id="cod_barras" v-model="producto.cod_barras" required="true" />
    </div>
    <div class="container-img-upload">
      <button class="btn-upload">
        <i class="pi pi-image" style="font-size: 1.5rem"></i>
        <label for="btn-img">Subir imagen</label>
      </button>
      <input id="btn-img" class="btn-img" type="file" accept="image/*" @change="getImagen" />
      <figure>
        <img v-if="imagen_min.value !== ''" class="img-miniatura" :src="imagen_min.value" alt="Imagen del producto">
        <p v-else>Miniatura de tu producto</p>
      </figure>
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
.btn-upload {
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