<template>
  <DataTable :value="customers" tableStyle="min-width: 45vw" :loading="load">
    <Column field="nombre_completo" header="Nombre/Apellido"></Column>
    <Column field="nit" header="NIT"></Column>
    <Column :exportable="false">
      <template #body="slotProps">
        <Button icon="pi pi-check-circle" class="p-button-rounded p-button-success mr-2"
          @click="addCustomer(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject } from 'vue'
import type { Cliente } from '../types'
import { usePinia } from '@/stores/store';

const props = defineProps({
  clientes: {
    type: Array,
    required: false
  }
});

// VARIABLES
const { clientes: customers } = toRefs(props);

// VARIBLE DE PINIA
const pinia = usePinia();

// injectamos el load para usarlo en el DataTable
const load = ref(inject<boolean>('load'));

// FUNCIONES
function addCustomer(customer: Cliente): void {
  pinia.changeCustomer(customer);
}
</script>

<script lang="ts">
export default {
  name: "CustomerWantedTable"
}
</script>
