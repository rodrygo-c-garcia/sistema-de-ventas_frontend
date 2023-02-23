<template>
  <div>
    <div class="card">
      <!-- BOTONES PARA EL REGISTRO Y ELIMINAR -->
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" class="p-button-danger"
            :disabled="!selectedProducts || !selectedProducts.length" />
          <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length" /> -->
        </template>

        <template #end>
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
            class="mr-2 inline-block" />
          <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
        </template>
      </Toolbar>

      <!-- TABLA PARA LOS PRODUCTOS -->
      <DataTable ref="dt" :value="productos" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
        :rows="10" :filters="filters" :loading="loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="scroll">

        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Administracion de Productos</h5>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="cod_barra" header="Codigo de barra" :sortable="true" style="min-width:10rem"></Column>
        <Column field="nombre" header="Nombre" :sortable="true" style="min-width:12rem"></Column>
        <Column field="categoria.nombre" header="Categoria" :sortable="true" style="min-width:12rem"></Column>
        <!-- <Column header="Image">
          <template #body="slotProps">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image"
              class="product-image" />
          </template>
        </Column> -->
        <Column field="precio_compra" header="Precio Compra" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.precio_compra) }}
          </template>
        </Column>
        <Column field="precio_venta" header="Precio Venta" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.precio_venta) }}
          </template>
        </Column>
        <Column field="utilidad" header="Utilidad" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.utilidad) }}
          </template>
        </Column>

        <Column field="stock" header="Stock" :sortable="true" style="min-width:8rem"></Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
              @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
              @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>

      <!-- FORMULARIO PARA EL REGISTRO DE PRODUCTOS -->
      <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Registrar Producto" :modal="true"
        class="p-fluid">
        <!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="product.image"
          class="product-image" v-if="product.image" /> -->
        <div class="field">
          <label for="name">Nombre</label>
          <InputText id="name" v-model.trim="producto.nombre" required="true" autofocus
            :class="{ 'p-invalid': submitted && !producto.nombre }" />
          <small class="p-error" v-if="submitted && !producto.nombre">Name is required.</small>
        </div>
        <div class="field">
          <label for="description">Codigo de Barras</label>
          <InputText id="description" v-model="producto.cod_barras" required="true" rows="3" cols="20" />
        </div>

        <!-- <div class="field">
          <label for="inventoryStatus" class="mb-3">Inventory Status</label>
          <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label"
            placeholder="Select a Status">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
          </Dropdown>
        </div>

        <div class="field">
          <label class="mb-3">Category</label>
          <div class="formgrid grid">
            <div class="field-radiobutton col-6">
              <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
              <label for="category1">Accessories</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
              <label for="category2">Clothing</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
              <label for="category3">Electronics</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
              <label for="category4">Fitness</label>
            </div>
          </div>
        </div> -->

        <div class="formgrid grid">
          <div class="field col">
            <label for="price">Precio Compra</label>
            <!-- <InputNumber id="price" v-model="producto.precio_compra" showButtons mode="currency" currency="USD"
              locale="en-US" /> -->
            <InputNumber inputId="horizontal" v-model="producto.precio_compra" :min="0" :max="100" showButtons
              buttonLayout="horizontal" :step="1" decrementButtonClass="p-button-danger"
              incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              mode="currency" currency="USD" locale="en-US" />
          </div>
          <div class="field col">
            <label for="quantity">Precio Venta</label>
            <InputNumber inputId="horizontal" v-model="producto.precio_venta" :min="0" :max="100" showButtons
              buttonLayout="horizontal" :step="1" decrementButtonClass="p-button-danger"
              incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              mode="currency" currency="USD" locale="en-US" />
          </div>
        </div>


        <div class="grid p-fluid">
          <div class="field col-12 md:col-6">
            <label for="minmax-buttons">Stock</label>
            <InputNumber inputId="minmax-buttons" v-model="producto.stock" mode="decimal" showButtons :min="0"
              :max="100" />
          </div>

          <div class="field col-12 md:col-6">
            <p for="utilidad">{{ ((producto.precio_venta - producto.precio_compra) > 0) ? `Utilidad:
                          $${producto.precio_venta - producto.precio_compra}` : '' }}</p>
          </div>
        </div>

        <!-- <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
        </template> -->
        {{ producto }}
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import * as apiProducto from '@/services/producto.service'

// variables dataTable
const loading = ref(true)
const toast = useToast();
const productos = ref([]);
const selectedProducts = ref();
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// variables para el formulario
const productDialog = ref(false);
const submitted = ref(false);

interface Producto {
  nombre: string,
  cod_barras: string,
  precio_compra: number,
  precio_venta: number,
  stock: number,
  categoria_id: number
}

const producto: Ref<Producto> = ref({
  nombre: '',
  cod_barras: '',
  precio_compra: 0,
  precio_venta: 0,
  stock: 0,
  categoria_id: 0
});


onMounted(() => {
  obtenerProductos()
})

async function obtenerProductos() {
  const { data: prod } = await apiProducto.getProductos();
  productos.value = prod
  loading.value = false
}


const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return;
};

function editProduct(prod: object): void {

}

function confirmDeleteProduct(prod: object): void {

}

const openNew = (): void => {
  producto.value = {
    nombre: '',
    cod_barras: '',
    precio_compra: 0,
    precio_venta: 0,
    stock: 0,
    categoria_id: 0
  };

  submitted.value = false;
  productDialog.value = true;
};

const hideDialog = (): void => {
  productDialog.value = false;
  submitted.value = false;
};

</script>

<style></style>