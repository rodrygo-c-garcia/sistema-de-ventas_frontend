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
          @click="subtractProductQuantity(slotProps.data)" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="deleteProduct(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import type { CarritoItem, Producto } from '../types'
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  car: {
    type: Array<CarritoItem>,
    required: true
  },
  prod: {
    type: Array<Producto>,
    required: true
  }
})

const { car: carrito } = toRefs(props)
const { prod: productos } = toRefs(props)

const toast = useToast()

const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return null;
};

function increaseProductQuantity(producto: CarritoItem) {
  const index = carrito.value.findIndex((prod: CarritoItem) => prod.id === producto.id)
  carrito.value[index].cantidad++
  carrito.value[index].sub_total = carrito.value[index].cantidad * carrito.value[index].precio
}

function subtractProductQuantity(producto: CarritoItem) {
  const index = carrito.value.findIndex((prod: CarritoItem) => prod.id === producto.id)
  if (carrito.value[index].cantidad > 1) {
    carrito.value[index].cantidad--
    carrito.value[index].sub_total = carrito.value[index].cantidad * carrito.value[index].precio
  }
}

function deleteProduct(producto: CarritoItem) {
  const index = carrito.value.findIndex((prod: CarritoItem) => prod.id === producto.id)
  // eliminamos del array el producto bucado
  carrito.value.splice(index, 1)
}
</script>

<script lang="ts">
export default {
  name: 'DataTableCarrito'
}
</script>