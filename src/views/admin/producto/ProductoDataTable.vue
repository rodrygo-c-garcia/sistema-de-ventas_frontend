<template>
  <ProductoToolbar />

  <DataTable ref="dt" :value="productos" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="5"
    :filters="filters" :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    responsiveLayout="scroll">

    <template #header>
      <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
        <h5 class="mb-2 md:m-0 p-as-md-center">Administracion de Productos</h5>
      </div>
    </template>

    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
    <Column field="cod_barras" header="Codigo de barra" :sortable="true" style="min-width:8rem"></Column>
    <Column field="nombre" header="Nombre" :sortable="true" style="min-width:8rem"></Column>
    <Column field="categoria.nombre" header="Categoria" :sortable="true" style="min-width:8rem"></Column>
    <Column header="Image">
      <template #body="slotProps">
        <img :src="`http://127.0.0.1:8000/${slotProps.data.imagen}`" :alt="slotProps.data.imagen" class="product-image" />
      </template>
    </Column>
    <Column field="precio_compra" header="Precio Compra" :sortable="true" style="min-width:4rem">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.precio_compra) }}
      </template>
    </Column>
    <Column field="precio_venta" header="Precio Venta" :sortable="true" style="min-width:4rem">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.precio_venta) }}
      </template>
    </Column>
    <Column field="utilidad" header="Utilidad" :sortable="true" style="min-width:4rem">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.utilidad) }}
      </template>
    </Column>

    <Column field="stock" header="Stock" :sortable="true" style="min-width:5rem"></Column>
    <Column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
          @click="confirmDeleteProduct(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
  <ProductoDialog :prod="producto" />
  <DialogDelete :prod="producto" />
</template>

<script setup lang="ts">
import ProductoToolbar from './ProductoToolbar.vue'
import ProductoDialog from './ProductoDialog.vue'
import DialogDelete from './DialogDelete.vue'


import { ref, onMounted, provide, watch, inject } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import * as apiProducto from '@/services/producto.service'
import type { Producto } from '../types';

// Variables
const display = ref(false)
provide('display', display)

const deleteProductDialog = ref(false);
provide('deleteProductDialog', deleteProductDialog)

const actualizar_productos = ref(true)
provide('actualizar_productos', actualizar_productos)

const loading = ref(true)
const productos = ref([]);
const producto = ref(<Producto>({}));
const selectedProducts = ref();
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Funciones

onMounted(() => {
  obtenerProductos()
})

watch(actualizar_productos, obtenerProductos)

async function obtenerProductos() {
  if (actualizar_productos.value) {
    const { data: prod } = await apiProducto.getProductos();
    productos.value = prod
    loading.value = false
    actualizar_productos.value = false
    console.log(productos.value)
  }
}

const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return;
};

function editProduct(prod: any): void {
  producto.value = { ...prod };
  display.value = true;
}

function confirmDeleteProduct(prod: any): void {
  producto.value = prod;
  deleteProductDialog.value = true;
}

</script>

<script lang="ts">
export default {
  name: 'ProductoDataTable'
}
</script>
<style>
.product-image {
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 7px #000;
}
</style>