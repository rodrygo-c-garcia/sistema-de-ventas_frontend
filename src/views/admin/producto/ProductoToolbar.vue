<template>
  <Toolbar class="mb-4">
    <template #start>
      <Button label="Producto Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
      <Button label="Delete" icon="pi pi-trash" class="p-button-danger"
        :disabled="!selectedProducts || !selectedProducts.length" />
    </template>

    <template #end>
      <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
        class="mr-2 inline-block" />
      <Button label="Export" icon="pi pi-upload" class="p-button-help" />
    </template>
  </Toolbar>

  <ProductoDialog :prod="producto" />
</template>
<script setup lang="ts">
import ProductoDialog from './ProductoDialog.vue'
import { ref, provide } from 'vue';
import type { Producto } from '../types';

// variables para el modal
const display = ref(false)
provide('display', display)

const selectedProducts = ref();
const producto = ref(<Producto>({}));

// Funciones
const openNew = (): void => {
  producto.value = {
    id: 0,
    nombre: '',
    cod_barras: '',
    precio_compra: 0,
    precio_venta: 0,
    stock: 0,
    categoria_id: 0,
    imagen_id: 0
  }
  display.value = true;
};


</script>

<script lang="ts">
export default {
  name: 'ProductoToolbar',
}
</script>
