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
  car: {
    type: Array<CarritoItem>,
    required: true
  },
  prod: {
    type: Array<Producto>,
    required: true
  },
  total_car: {
    type: Number,
    required: true
  }
})

const { car: carrito } = toRefs(props)
const { prod: productos } = toRefs(props)
const total_carrito = ref(props.total_car)


const toast = useToast()
// Definir el evento emitido por el componente
const emits = defineEmits(['update:total_carrito'])

// Definir constantes para evitar números mágicos
const AUMENTAR = true;
const DISMINUIR = false;

// Escuchar cambios en la prop total_car y actualizar la ref local
watch(() => props.total_car, (newValue) => {
  total_carrito.value = newValue
})

// Escuchar cambios en la ref local y emitir un evento al padre
watch(total_carrito, (newValue) => {
  emits('update:total_carrito', newValue)
})

// Actualizar el total del carrito usando la ref local
const updateCartTotal = (option: boolean, valor: number) => {
  total_carrito.value += option ? valor : -valor;
}

function findProductIndex(id: number) {
  return productos.value.findIndex((prod: Producto) => prod.id == id)
}

function findCarritoIndex(id: number) {
  return carrito.value.findIndex((cgt: CarritoItem) => cgt.id == id)
}

function increaseProductQuantity(producto: CarritoItem) {
  // buscamos el indice del producto a aumentar la cantidad
  let indexProd = findProductIndex(producto.id);
  let index = 0;

  // preguntamos si la cantidad del producto encontrado es mayor o igual a 1 
  if (productos.value[indexProd].stock >= 1) {
    index = findCarritoIndex(producto.id);
    // aumentamos la cantidad en el carrito
    carrito.value[index].cantidad++;
    carrito.value[index].sub_total = carrito.value[index].cantidad * carrito.value[index].precio;
    // disminuimos esl stock del producto
    productos.value[indexProd].stock--;

    updateCartTotal(AUMENTAR, carrito.value[index].precio);

  } else toast.add({ severity: 'warn', summary: `Stock Vacio de ${productos.value[indexProd].nombre}`, detail: 'Agregue mas productos de este tipo', life: 3000 });
}

function subtractProductQuantity(producto: CarritoItem) {
  // buscamos el indice del producto a disminuir la cantidad
  let indexProd = productos.value.findIndex((prod: Producto) => prod.id === producto.id);
  // buscamos el indice del producto en el carrito 
  const index = carrito.value.findIndex((prod: CarritoItem) => prod.id === producto.id)
  // pregunta si la cantidad del producto es 1 en el carrito
  if (carrito.value[index].cantidad > 1) {
    // vamos a ir disminuyendo la cantidad
    carrito.value[index].cantidad--
    carrito.value[index].sub_total = carrito.value[index].cantidad * carrito.value[index].precio
    productos.value[indexProd].stock++
    updateCartTotal(false, carrito.value[index].precio)
  } else {
    // eliminamos el producto del carrito
    productos.value[indexProd].stock++
    updateCartTotal(false, carrito.value[index].precio)
    carrito.value.splice(index, 1)
  }
}

function deleteProduct(producto: CarritoItem) {
  let indexProd = productos.value.findIndex((prod: Producto) => prod.id === producto.id);
  const index = carrito.value.findIndex((prod: CarritoItem) => prod.id === producto.id)
  productos.value[indexProd].stock += carrito.value[index].cantidad

  updateCartTotal(false, carrito.value[index].precio * carrito.value[index].cantidad)
  // eliminamos del array el producto bucado
  carrito.value.splice(index, 1)
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