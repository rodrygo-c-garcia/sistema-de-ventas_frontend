<template>
  <DataTable :value="customers" tableStyle="min-width: 45vw">
    <Column field="nombre_completo" header="Nombre/Apellido"></Column>
    <Column field="nit" header="NIT"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'

const props = defineProps({
  clientes: {
    type: Array,
    required: false
  }
});

// VARIABLES
const { clientes: customers } = toRefs(props);

// FUNCIONES
function addCustomer(customer: Cliente): void {

}
</script>

<script lang="ts">
export default {
  name: "CustomerWantedTable"
}
</script>
