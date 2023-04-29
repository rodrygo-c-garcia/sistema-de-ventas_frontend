<template>
  <Toast />
  <DataTable ref="dt" :value="carrito" dataKey="id" :paginator="true" :rows="5"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    responsiveLayout="scroll">

    <template #header>
      <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
        <h5 class="mb-2 md:m-0 p-as-md-center">Carrito</h5>
      </div>
    </template>

    <Column field="nombre" header="Nombre" :sortable="true" style="min-width:8rem"></Column>
    <Column field="precio" header="Precio" :sortable="true" style="min-width:4rem">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.precio) }}
      </template>
    </Column>
    <Column field="sub_total" header="Sub Total" :sortable="true" style="min-width:4rem">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.sub_total) }}
      </template>
    </Column>
    <Column field="cantidad" header="Cantidad" :sortable="true" style="min-width:5rem"></Column>
    <Column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <Button icon="pi pi-plus" class="p-button-rounded p-button-success mr-2"
          @click="increaseProductQuantity(slotProps.data)" />
        <Button icon="pi pi-minus" class="p-button-rounded p-button-warning mr-2"
          @click="decreaseProductQuantity(slotProps.data)" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2"
          @click="removeProductFromCart(slotProps.data)" />
      </template>
    </Column>
    <template #footer>
      <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
        <h5 class="mb-2 md:m-0 p-as-md-center"> Total: <span>{{ total_carrito }}</span></h5>
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs, defineEmits, watch } from 'vue';
import type { CarritoItem, Producto } from '../types'
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  prod: {
    type: Object,
    required: true
  }
})

const carrito = ref<Array<CarritoItem>>([]);

const { prod: productos } = toRefs(props);
const total_carrito = ref<number>(0);

const toast = useToast()
// Definir el evento emitido por el componente
const emits = defineEmits(['update:total_carrito'])

// Definir constantes para evitar números mágicos
const AUMENTAR = true;
const DISMINUIR = false;

function increaseProductQuantity(prod: CarritoItem) {

}

function decreaseProductQuantity(prod: CarritoItem) {

}

function removeProductFromCart(prod: CarritoItem) {

}

const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return null;
};

</script>

<script lang="ts">
export default {
  name: 'DataTableCarrito'
}
</script>