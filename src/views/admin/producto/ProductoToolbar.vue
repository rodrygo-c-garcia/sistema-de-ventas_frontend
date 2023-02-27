<template>
  <Toolbar class="mb-4">
    <template #start>
      <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
      <Button label="Delete" icon="pi pi-trash" class="p-button-danger"
        :disabled="!selectedProducts || !selectedProducts.length" />
      <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length" /> -->
    </template>

    <template #end>
      <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
        class="mr-2 inline-block" />
      <Button label="Export" icon="pi pi-upload" class="p-button-help" />
      <!-- <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" /> -->
    </template>
  </Toolbar>

  <ProductoDialog :prod="producto" />
</template>
<script setup lang="ts">
import ProductoDialog from './ProductoDialog.vue'
import type { Ref } from 'vue';
import { ref, provide, onMounted, inject } from 'vue';
import type { Producto } from '../types';

// variables para el modal
const display = ref(false)
provide('display', display)

const selectedProducts = ref();
const producto = ref(<Producto>({}));

const openNew = (): void => {
  producto.value = {
    id: 0,
    nombre: '',
    cod_barras: '',
    precio_compra: 0,
    precio_venta: 0,
    stock: 0,
    categoria_id: 0
  }
  display.value = true;
};


</script>

<script lang="ts">
export default {
  name: 'ProductoToolbar',
}
</script>

<style></style>