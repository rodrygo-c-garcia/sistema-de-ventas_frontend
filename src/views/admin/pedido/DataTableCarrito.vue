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
    <Column field="stock" header="Stock" :sortable="true" style="min-width:5rem"></Column>
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
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { CarritoItem, Producto } from '../types';
import { severety } from '../types';
import { useToast } from 'primevue/usetoast';


const props = defineProps({
  prod: {
    type: Object,
    required: true
  }
})

const carrito = ref<Array<CarritoItem>>([]);
const total_carrito = ref<number>(0);

const toast = useToast()
// Definir el evento emitido por el componente
const emit = defineEmits(['updateButtonColor'])

// Definir constantes para evitar números mágicos
const AUMENTAR = true;
const DISMINUIR = false;

// FUNCIONES
// definir una función para añadir el prod al carrito
const addToCart = () => {
  // si es falsy se ejecuta el codigo
  if (!findProduct()) {
    const producto: CarritoItem = {
      id: props.prod.id,
      nombre: props.prod.nombre,
      precio: props.prod.precio_venta,
      sub_total: 0,
      cantidad: 1,
      stock: props.prod.stock
    }

    producto['sub_total'] = producto['precio'] * producto['cantidad'];
    carrito.value.push(producto);
    calculateTotal()
    emit('updateButtonColor', carrito.value)
  }
}

function findProduct() {
  return carrito.value.find(producto => producto.id === props.prod.id);
}
// usar watch para observar el prop prod y ejecutar addToCart cuando cambie
watch(() => props.prod, addToCart)

function increaseProductQuantity(prod: CarritoItem) {
  if (prod.stock > prod.cantidad) {
    prod.cantidad++;
    calculateSubtotal(prod);
  }
  else showMessage(severety.WARN, 'La cantidad no debe exceder el Stock', '');
}

function decreaseProductQuantity(prod: CarritoItem) {
  if (prod.cantidad > 1) {
    prod.cantidad--;
    calculateSubtotal(prod);
  }
  else removeProductFromCart(prod);
}

function calculateSubtotal(prod: CarritoItem) {
  prod.sub_total = prod.precio * prod.cantidad;
  calculateTotal()
}

function calculateTotal() {
  total_carrito.value = carrito.value.reduce((acumulator: number, product: CarritoItem) => {
    return acumulator + product.sub_total;
  }, 0)
}

function removeProductFromCart(prod: CarritoItem) {
  const index = findIndexProduct(prod);
  if (index !== -1) {
    carrito.value.splice(index, 1);
    calculateTotal()
    emit('updateButtonColor', carrito.value)
  }
}

function showMessage(severety: string, message: string, detail: string) {
  toast.add({ severity: severety, summary: message, detail: detail, life: 3000 });
}

function findIndexProduct(prod: CarritoItem) {
  return carrito.value.findIndex(item => item.id === prod.id);
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