<template>
  <div class="card" style="display: flex; justify-content: center;">
    <span class="p-input-icon-left">
      <i class="pi pi-search" style="color: blue; font-size: 18px;" />
      <InputText style="width: 500px; height: 50px; box-shadow: 2px 1px 4px green;" type="text" v-model="search_term"
        placeholder="Buscar Codigo de Barra o nombre del Producto" @keyup="searchProduct()" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import * as productoService from '@/services/producto.service';

// Variables 
const search_term = ref<string>('');
const loading = ref(inject<boolean>('loading'))

const emit = defineEmits(['searched']);

// Funciones 
async function searchProduct() {
  loading.value = true;
  const { data: { data } } = await productoService.lookingForProduct(search_term.value);
  // agregamos data.data por la paginacion
  emit('searched', search_term.value.length > 0 ? data.data : []);
  loading.value = false;
}

</script>

<script lang="ts">
export default {
  name: 'SearchProducto'
}
</script>
