<template>
  <SearchInput @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="Buscar Cliente" :style="{ width: '50vw' }">
    <div class="flex justify-content-center">
      <span class="p-input-icon-left">
        <i class="pi pi-search" style="color: blue; font-size: 18px;" />
        <InputText style="width: 300px; height: 50px; box-shadow: 2px 1px 4px green;" type="text"
          placeholder="Buscar Cliente por NIT o Nombre" />
      </span>
    </div>
    <div :style="{ margin: '10px' }">
      <DataTable tableStyle="min-width: 45vw">
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchInput from './SearchInput.vue'

// VARIABLES react
const visible = ref<boolean>(false);
const customers = ref([]);


</script>

<script lang="ts">
export default {
  name: "SearchCliente"
}
</script>