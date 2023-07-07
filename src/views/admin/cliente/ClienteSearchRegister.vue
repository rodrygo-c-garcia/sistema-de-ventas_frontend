<template>
  <div>
    <h5>Cliente</h5>
    <div class="card flex justify-content-center">
      <!-- Registrar nuevo cliente -->
      <div>
        <RegisterCliente />
      </div>
      <!-- Buscar Cliente -->
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RegisterCliente from './RegisterCliente.vue';

// VARIABLES REACTIVAS
const visible = ref<boolean>(false);
</script>

<script lang="ts">
export default {
  name: "ClienteSearch"
}
</script>