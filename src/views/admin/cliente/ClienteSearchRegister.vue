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
        <RegisterCliente :cliente="cliente" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RegisterCliente from './RegisterCliente.vue';
import SearchCliente from './SearchCliente.vue';
import type { Cliente } from '../types';

const cliente = ref(<Cliente>({}));


// VARIABLES REACTIVAS
const visible = ref<boolean>(false);
</script>

<script lang="ts">
export default {
  name: "ClienteSearch"
}
</script>