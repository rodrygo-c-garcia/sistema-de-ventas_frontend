<template>
  <Toast />
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
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  clientes: {
    type: Array,
    required: false
  }
});

// VARIABLES
const { clientes: customers } = toRefs(props);
const toast = useToast();

// VARIBLE DE PINIA
const pinia = usePinia();

// injectamos el load para usarlo en el DataTable
const load = ref(inject<boolean>('load'));

// injectamos el visible para usarlo en el DataTable
const visible = ref(inject<boolean>('visible'));

// FUNCIONES
function addCustomer(customer: Cliente): void {
  pinia.changeCustomer(customer);
  visible.value = false;
  toast.add({ severity: 'success', summary: "Cliente seleccionado", detail: '', life: 3000 });

}
</script>

<script lang="ts">
export default {
  name: "CustomerWantedTable"
}
</script>
