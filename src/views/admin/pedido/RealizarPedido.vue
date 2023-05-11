<template>
  <Dialog v-model:visible="visible" modal header="Realizar Pedido" :style="{ width: '50vw' }">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </Dialog>
  {{ visible }}
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';

// ATRIBUTOS
const visible = ref(inject<boolean>("visible"));
</script>

<script lang="ts">
export default {
  name: 'RealizarPedido',
}
</script>
