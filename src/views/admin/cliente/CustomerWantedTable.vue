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
import { ref, toRefs, provide } from 'vue'
import type { Cliente } from '../types'

const props = defineProps({
  clientes: {
    type: Array,
    required: false
  }
});

// VARIABLES
const { clientes: customers } = toRefs(props);
const load = ref<boolean>(false);
provide('load', load);

// FUNCIONES
function addCustomer(customer: Cliente): void {

}
</script>

<script lang="ts">
export default {
  name: "CustomerWantedTable"
}
</script>
