<template>
  <div>
    <h5>Cliente</h5>
    <div class="flex justify-content-between align-items-center">
      <!-- Buscar Cliente -->
      <div>
        <SearchCliente />
      </div>
      <!-- Registrar nuevo cliente -->
      <div>
        <RegisterCliente />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RegisterCliente from './RegisterCliente.vue';
import SearchCliente from './SearchCliente.vue';

// VARIABLES REACTIVAS
const visible = ref<boolean>(false);
</script>

<script lang="ts">
export default {
  name: "ClienteSearch"
}
</script>

<style>
.data-customer {
  margin-top: 20px;
}
</style>