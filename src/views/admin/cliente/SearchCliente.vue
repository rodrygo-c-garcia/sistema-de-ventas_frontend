<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" style="color: blue; font-size: 18px;" />
    <InputText style="width: 300px; height: 50px; box-shadow: 2px 1px 4px green;" type="text"
      placeholder="Buscar Cliente por NIT o Nombre" @click="visible = true" />
  </span>
  <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// VARIABLES react
const visible = ref<boolean>(false);

</script>

<script lang="ts">
export default {
  name: "SearchCliente"
}
</script>