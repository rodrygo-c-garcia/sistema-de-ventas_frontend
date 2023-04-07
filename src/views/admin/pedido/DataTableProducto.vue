<template>
  <DataTable ref="dt" :value="productos" dataKey="id" :paginator="true" :rows="5" :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    responsiveLayout="scroll">

    <template #header>
      <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
        <h5 class="mb-2 md:m-0 p-as-md-center">Administracion de Productos</h5>
      </div>
    </template>

    <Column field="cod_barras" header="Codigo de barra" :sortable="true" style="min-width:8rem"></Column>
    <Column field="nombre" header="Nombre" :sortable="true" style="min-width:8rem"></Column>
    <Column header="Imagen">
      <template #body="slotProps">
        <img :src="slotProps.data.imagen.url" class="product-image" alt="" />
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

    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import * as serviceProducto from '@/services/producto.service'
import { ref, onMounted } from 'vue';

const productos = ref([])
const loading = ref(true)

onMounted(() => {
  obtenerProductos()
})

async function obtenerProductos() {
  const { data: prod } = await serviceProducto.getProductos();
  productos.value = prod
  loading.value = false

}

const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return null;
};
</script>

<script lang="ts">
export default {
  name: 'DataTableProducto'
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