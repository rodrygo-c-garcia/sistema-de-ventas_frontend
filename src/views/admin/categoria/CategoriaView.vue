<template>
  <div class="card">
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
    <h5>Categoria</h5>
    <DataTable :value="lista_categorias" responsiveLayout="scroll" :loading="loading">
      <Column field="nombre" header="NOMBRE" :sortable="true"></Column>
      <Column field="detalle" header="DETALLE" :sortable="true"></Column>
      <Column field="created_at" header="FECHA" :sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import * as apiCategoria from '@/services/categoria.service'
import { onMounted, ref } from 'vue';

const lista_categorias = ref([])
const loading = ref(true)
const submitted = ref(false)
const productDialog = ref(false)

onMounted(() => {
  ObtenerCategorias()
})

async function ObtenerCategorias() {
  const { data } = await apiCategoria.getCategoria();
  lista_categorias.value = data
  loading.value = false
}

function openNew() {
  // lista_categorias.value = [];
  // submitted.value = false;
  // productDialog.value = true;
  alert('Hola')
}

</script>

<style></style>