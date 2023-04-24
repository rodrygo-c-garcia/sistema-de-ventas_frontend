<template>
  <!-- BUSCADOR -->
  <div class="card">
    <h3>Buscador</h3>
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <!-- <InputText type="text" v-model="identificacion" placeholder="Buscar NIT del cliente" @keyup="getCliente" /> -->
      <InputText style="width: 300px; height: 50px;" type="text" placeholder="Buscar NIT o nombre del Producto" />
    </span>
  </div>
  <!-- DATA TABLE -->
  <DataTableProducto />
</template>

<script setup lang="ts">
import DataTableProducto from './DataTableProducto.vue';
</script>
