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
    <div class="data-customer">
      <p>Nombre: <span class="data-cliente">{{ pinia.customer?.nombre_completo }}</span></p>
      <p>NIT: <span class="data-cliente">{{ pinia.customer?.nit }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RegisterCliente from './RegisterCliente.vue';
import SearchCliente from './SearchCliente.vue';
import { usePinia } from '@/stores/store';

// VARIABLES REACTIVAS
const visible = ref<boolean>(false);

// VARIBLE DE PINIA
const pinia = usePinia(); 
</script>

<script lang="ts">
export default {
  name: "ClienteSearch"
}
</script>

<style>
.data-customer {
  margin-top: 20px;
  font-size: 14px;
}

.data-cliente {
  font-size: 16px;
  font-weight: 500;
}
</style>