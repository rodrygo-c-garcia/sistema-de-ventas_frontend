<template>
  <Toast />
  <SearchInput @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="Buscar Cliente" :style="{ width: '50vw' }">
    <div class="flex justify-content-center">
      <span class="p-input-icon-left">
        <i class="pi pi-search" style="color: blue; font-size: 18px;" />
        <InputText style="width: 300px; height: 50px; box-shadow: 2px 1px 4px green;" type="text"
          placeholder="Buscar Cliente por NIT o Nombre" v-model="searchTerm" @keyup="searchCustomer" />
      </span>
    </div>
    <div :style="{ margin: '10px' }">
      <CustomerWantedTable :clientes="customers" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import SearchInput from './SearchInput.vue'
import CustomerWantedTable from './CustomerWantedTable.vue';
import * as customerService from '@/services/cliente.service';
import { useToast } from 'primevue/usetoast';


// VARIABLES react
const visible = ref<boolean>(false);
const customers = ref([]);
const searchTerm = ref<string>('');
const toast = useToast();

// enviar load al hijo para la carga del DataTable
const load = ref(inject<boolean>('load'));

// FUNCIONES
async function searchCustomer() {
  try {
    load.value = true;
    const { data: { data } } = await customerService.lookingForCustomer(searchTerm.value);
    customers.value = data.data;
  } catch (error) {
    console.log('error en el back', error);
    toast.add({ severity: 'error', summary: "Error", detail: 'Hubo un error al buscar clientes.', life: 3000 });
  } finally {
    load.value = false;
  }
}
</script>

<script lang="ts">
export default {
  name: "SearchCliente"
}
</script>