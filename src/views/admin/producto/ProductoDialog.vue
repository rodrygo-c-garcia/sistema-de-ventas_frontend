<script setup lang="ts">
import { toRefs } from 'vue';
import type { Ref } from 'vue';
import type { Producto, Categoria } from '../types';
import { onMounted, ref, inject } from 'vue'
import * as apiCategoria from '@/services/categoria.service'
import { useToast } from 'primevue/usetoast';
// Props
const props = defineProps({
  producto: {
    type: Object as () => Producto,
    required: true
  }
});

// VARIBLES
const toast = useToast();
const submitted = ref(false);
const display = ref(inject<boolean>('display'));
// desestructuramos nuestro porp y solo obtenemos producto
const { producto } = toRefs(props);
const categorias = ref([])

// FUNCIONES
onMounted(() => {
  ObtenerCategorias()
})

async function ObtenerCategorias() {
  const { data } = await apiCategoria.getCategorias();
  categorias.value = data
}

const closeDialog = () => {
  display.value = false;
  submitted.value = false;
};

const saveProduct = () => {
  submitted.value = true;
  if (producto.value.nombre.trim()) {
    if (producto.value.stock) {
      if (producto.value.categoria_id) {
        // Si el ID existe actualizamos
        if (producto.value.id) {
          // products.value[findIndexById(product.value.id)] = product.value;
          // toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } // Caso contrario creamos nuevo Prodcuto 
        else {
          // product.value.id = createId();
          // product.value.code = createId();
          // product.value.image = 'product-placeholder.svg';
          // product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
          // products.value.push(product.value);
          // toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        display.value = false;
      } else toast.add({ severity: 'warn', summary: 'Seleccione una Categoria', detail: 'Obligatorio', life: 3000 });
    } else toast.add({ severity: 'warn', summary: 'El campo Stock no puede ir vacio', detail: 'Obligatorio', life: 3000 });
  } else toast.add({ severity: 'warn', summary: 'Llene el campo Nombre', detail: 'Obligatorio', life: 3000 });
}

</script>

<script lang="ts">
export default {
  name: 'ProductoDialog'
}
</script>
<template>
  <Toast />
  <Dialog v-model:visible="display" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
    <p>{{ producto }}</p>
    <div class="field">
      <label for="name">Nombre</label>
      <InputText id="name" v-model.trim="producto.nombre" required="true" autofocus />
    </div>
    <div class="field">
      <label for="description">Codigo de Barras</label>
      <InputText id="cod_barras" v-model="producto.cod_barras" required="true" rows="3" cols="20" />
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Precio Compra</label>
        <InputNumber inputId="horizontal" v-model="producto.precio_compra" showButtons buttonLayout="horizontal"
          :step="0.50" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"
          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="currency" currency="USD" locale="en-US"
          :min="0" :max="500" />
      </div>
      <div class="field col">
        <label for="quantity">Precio Venta</label>
        <InputNumber inputId="horizontal" v-model="producto.precio_venta" showButtons buttonLayout="horizontal"
          :step="0.50" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"
          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="currency" currency="USD" locale="en-US"
          :min="0" :max="500" />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="minmax">Stock</label>
        <InputNumber inputId="minmax-buttons" v-model="producto.stock" mode="decimal" showButtons :min="0" :max="100" />
      </div>
      <div class="field col">
        <div class="card">
          <p class="utilidad"> {{ (producto.precio_venta - producto.precio_compra > 0) ? `Utilidad:
                      $${producto.precio_venta -
            producto.precio_compra}` : 'Sin utilidad' }}</p>
          <p> {{ (producto.precio_venta - producto.precio_compra > 0) ? `Utlidad Total:
                      $${(producto.precio_venta -
              producto.precio_compra) * producto.stock}` : '' }}</p>
        </div>
      </div>
    </div>
    <div class="field">
      <!-- <label for="inventoryStatus" class="mb-3">Categoria</label> -->
      <Dropdown v-model="producto.categoria_id" :options="categorias" optionLabel="nombre" optionValue="id"
        placeholder="Select a City" />
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-danger" @click="closeDialog" />
      <Button label="Save" icon="pi pi-check" class="p-button-primary" @click="saveProduct" />
    </template>
  </Dialog>
</template>

<style>
.utilidad {
  font-size: 16px;
}
</style>