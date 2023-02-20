<template>
  <div class="card">
    <!-- opciones de Categoria -->
    <Toolbar class="mb-4">
      <template #start>
        <Button label="Nueva Categoria" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
      </template>

      <template #end>
        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
          class="mr-2 inline-block" />
        <Button label="Export" icon="pi pi-upload" class="p-button-help" />
      </template>
    </Toolbar>
    <!-- Tabla de categorias -->
    <h5>Categoria</h5>
    <DataTable :value="lista_categorias" responsiveLayout="scroll" :loading="loading">
      <Column field="nombre" header="NOMBRE" :sortable="true"></Column>
      <Column field="detalle" header="DETALLE" :sortable="true"></Column>
      <Column field="created_at" header="FECHA" :sortable="true"></Column>
    </DataTable>

    <!-- Agregar nueva categoria -->
    <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Registrar nueva categoria" :modal="true"
      class="p-fluid">
      <div class="field">
        <label for="name">Nombre</label>
        <InputText id="name" v-model.trim="categoria.nombre" required="true" autofocus
          :class="{ 'p-invalid': submitted && !categoria.nombre }" />
        <small class="p-error" v-if="submitted && !categoria.nombre">Name is required.</small>
      </div>
      <div class="field">
        <label for="description">Detalle</label>
        <Textarea id="description" v-model="categoria.detalle" required="true" rows="3" cols="20" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-danger" @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveCategory" />
      </template>
    </Dialog>


  </div>
</template>

<script setup lang="ts">
import * as apiCategoria from '@/services/categoria.service'
import { onMounted, ref } from 'vue';

const lista_categorias = ref([])
const loading = ref(true)
const submitted = ref(false)
const productDialog = ref(false)
const categoria = ref({
  nombre: '',
  detalle: ''
})

onMounted(() => {
  ObtenerCategorias()
})

async function ObtenerCategorias() {
  const { data } = await apiCategoria.getCategoria();
  lista_categorias.value = data
  loading.value = false
}

function openNew() {
  categoria.value = {
    nombre: '',
    detalle: ''
  };
  submitted.value = false;
  productDialog.value = true;
}

function hideDialog() {
  productDialog.value = false;
  submitted.value = false;
}

async function saveCategory() {

}
</script>

<style></style>