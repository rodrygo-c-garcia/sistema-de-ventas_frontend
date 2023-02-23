<template>
  <div>
    <div class="card">
      <DataTable ref="dt" :value="productos" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
        :rows="10" :filters="filters" :loading="loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="scroll">

        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Administracion de Productos</h5>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="cod_barra" header="Codigo de barra" :sortable="true" style="min-width:10rem"></Column>
        <Column field="nombre" header="Nombre" :sortable="true" style="min-width:12rem"></Column>
        <Column field="categoria.nombre" header="Categoria" :sortable="true" style="min-width:12rem"></Column>
        <!-- <Column header="Image">
          <template #body="slotProps">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image"
              class="product-image" />
          </template>
        </Column> -->
        <Column field="precio_compra" header="Precio Compra" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.precio_compra) }}
          </template>
        </Column>
        <Column field="precio_venta" header="Precio Venta" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.precio_venta) }}
          </template>
        </Column>
        <Column field="utilidad" header="Utilidad" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.utilidad) }}
          </template>
        </Column>

        <Column field="stock" header="Stock" :sortable="true" style="min-width:8rem"></Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
              @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
              @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import * as apiProducto from '@/services/producto.service'

const loading = ref(true)
const toast = useToast();
const productos = ref([]);

onMounted(() => {
  obtenerProductos()
})

async function obtenerProductos() {
  const { data: prod } = await apiProducto.getProductos();
  productos.value = prod
  loading.value = false
}

const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return;
};
</script>

<style></style>