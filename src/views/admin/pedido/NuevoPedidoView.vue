<template>
  <!-- BUSCADOR -->
  <div class="card" style="display: flex; justify-content: center;">
    <span class="p-input-icon-left">
      <i class="pi pi-search" style="color: blue; font-size: 18px;" />
      <!-- <InputText type="text" v-model="identificacion" placeholder="Buscar NIT del cliente" @keyup="getCliente" /> -->
      <InputText style="width: 500px; height: 50px; box-shadow: 2px 1px 4px green;" type="text"
        placeholder="Buscar NIT o nombre del Producto" />
    </span>
  </div>
  <!-- DATA TABLE -->
  <DataTableProducto />
</template>

<script setup lang="ts">
import DataTableProducto from './DataTableProducto.vue';
</script>
