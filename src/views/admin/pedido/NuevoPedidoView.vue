<template>
  <div class="card">
    <h3>Buscador</h3>

  </div>
  <div class="card">
    <DataTable :value="productos" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <Column field="cod_barras" header="Codigo de barra" :sortable="true" style="min-width:8rem"></Column>
      <Column field="nombre" header="Nombre" :sortable="true" style="min-width:8rem"></Column>
      <Column field="categoria.nombre" header="Categoria" :sortable="true" style="min-width:8rem"></Column>
      <Column header="Imagen">
        <template #body="slotProps">
          <img :src="slotProps.data.imagen.url" class="product-image" alt="" />
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
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import * as serviceProducto from '@/services/producto.service'
import { ref, onMounted } from 'vue';

const productos = ref([])

onMounted(() => {
  obtenerProductos()
})

async function obtenerProductos() {
  const { data: prod } = await serviceProducto.getProductos();
  productos.value = prod

}

const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return null;
};


</script>
