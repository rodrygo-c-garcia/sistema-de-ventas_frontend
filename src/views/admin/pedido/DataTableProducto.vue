<template>
  <Toast />
  <div class="card">
    <DataTable ref="dt" :value="productos" dataKey="id" :paginator="true" :rows="5" :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      responsiveLayout="scroll">

      <template #header>
        <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
          <h5 class="mb-2 md:m-0 p-as-md-center">Productos Disponibles</h5>
        </div>
      </template>

      <Column field="cod_barras" header="Codigo de barra" :sortable="true" style="min-width:8rem"></Column>
      <Column field="nombre" header="Nombre" :sortable="true" style="min-width:8rem"></Column>
      <Column header="Imagen">
        <template #body="slotProps">
          <img :src="slotProps.data.imagen.url" class="product-image" alt="" />
        </template>
      </Column>
      <Column field="precio_venta" header="Precio Venta" :sortable="true" style="min-width:4rem">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.precio_venta) }}
        </template>
      </Column>
      <Column field="utilidad" header="Utilidad" :sortable="true" style="min-width:4rem">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.utilidad) }}
        </template>
      </Column>

      <Column field="stock" header="Stock" :sortable="true" style="min-width:5rem"></Column>
      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-cart-plus" class="p-button-rounded p-button-success mr-2"
            @click="addStore(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
  <!-- CARRITO -->
  <div class="card">
    <DataTableCarrito :car="carrito" />
  </div>
</template>

<script setup lang="ts">
import DataTableCarrito from './DataTableCarrito.vue';
import * as serviceProducto from '@/services/producto.service'
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import type { CarritoItem, Producto } from '../types'

// loading
const loading = ref(true)

const productos = ref<Array<any>>([])

const total_carrito = ref<number>(0.0)
const toast = useToast();


const carrito = ref<Array<CarritoItem>>([])

onMounted(() => {
  obtenerProductos()
})

async function obtenerProductos() {
  const { data: prod } = await serviceProducto.getProductos();
  productos.value = prod
  loading.value = false
}

const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return null;
};

// Carrito 
function addStore(producto: Producto) {
  let prod: CarritoItem = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio_venta,
    sub_total: 0.0,
    cantidad: 1
  };

  // sacamos el subtotal de un producto

  prod['sub_total'] = parseFloat((prod.precio * prod.cantidad).toFixed(2))

  // Buscamos el indice del elemento a reducir el stock
  let index = productos.value.findIndex((prod: any) => prod.id === producto.id)

  // preguntamos si existe el producto buscado y reducimos el stock que va a gregandoce
  if (index !== -1) {
    if (productos.value[index].stock === 0) toast.add({ severity: 'warn', summary: `Stock Vacio de ${productos.value[index].nombre}`, detail: 'Agregue mas productos de este tipo', life: 3000 });
    else productos.value[index].stock--
  }

  // Guardamos el producto en el arreglo de carrito, solo una vez por pruducto
  if (!increaseProductQuantity(prod.id))
    carrito.value.push(prod)
}

function increaseProductQuantity(id: number) {
  // retorna el indice del elemento a buscar
  for (let prod = 0; prod < carrito.value.length; prod++) {
    if (carrito.value[prod].id == id) {
      carrito.value[prod].cantidad++
      carrito.value[prod].sub_total = carrito.value[prod].cantidad * carrito.value[prod].precio
      return true
    }
  }
  return false
}
</script>

<script lang="ts">
export default {
  name: 'DataTableProducto'
}
</script>

<style>
.product-image {
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 7px #000;
}
</style>