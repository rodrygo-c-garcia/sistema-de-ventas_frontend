<template>
  <!-- BUSCADOR -->
  <SearchProducto />
  <!-- DATA TABLE -->
  <DataTableProducto />
</template>

<script setup lang="ts">
import DataTableProducto from './DataTableProducto.vue';
import SearchProducto from './SearchProducto.vue';
</script>

<script lang="ts">
export default {
  name: 'NuevoPedidoView'
}
</script>
