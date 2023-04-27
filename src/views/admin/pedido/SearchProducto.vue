<template>
  <div class="card" style="display: flex; justify-content: center;">
    <span class="p-input-icon-left">
      <i class="pi pi-search" style="color: blue; font-size: 18px;" />
      <!-- <InputText type="text" v-model="identificacion" placeholder="Buscar NIT del cliente" @keyup="getCliente" /> -->
      <InputText style="width: 500px; height: 50px; box-shadow: 2px 1px 4px green;" type="text" v-model="search_term"
        placeholder="Buscar Codigo de Barra o nombre del Producto" @keyup="searchProduct()" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { Producto } from '../types';

const props = defineProps({
  productos: {
    type: Array<Producto>,
    required: true
  }
})

// Varibles 
const products_found = ref<Array<Producto>>([]);
const search_term = ref<String>('')

// Funciones 
function searchProduct() {

}
</script>

<script lang="ts">
export default {
  name: 'SearchProducto'
}
</script>
