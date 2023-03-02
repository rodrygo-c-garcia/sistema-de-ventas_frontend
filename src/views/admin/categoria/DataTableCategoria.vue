<template>
  <ToolbarCategoria />

  <h5>Categoria</h5>
  <DataTable ref="dt" :value="categorias" dataKey="id" :paginator="true" :rows="5" :filters="filters" :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    responsiveLayout="scroll">
    <Column field="nombre" header="NOMBRE" :sortable="true"></Column>
    <Column field="detalle" header="DETALLE" :sortable="true"></Column>
    <Column field="created_at" header="FECHA DE CREACION" :sortable="true"></Column>
    <Column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editCateory(slotProps.data)" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
          @click="confirmDeleteCategory(slotProps.data)" />
      </template>
    </Column>
  </DataTable>

  <DialogCategoria :cat="categoria" />
  <DeleteCategoria :cat="categoria" />
</template>

<script setup lang="ts">
import { ref, onMounted, provide, watch } from 'vue'
import * as categoriaService from '@/services/categoria.service'
import { FilterMatchMode } from 'primevue/api';
import ToolbarCategoria from './ToolbarCategoria.vue';
import DialogCategoria from './DialogCategoria.vue';
import DeleteCategoria from './DeleteCategoria.vue';
import type { Categoria } from '../types';

// variables
const categorias = ref([])
const categoria = ref(<Categoria>({}))
const loading = ref(true)
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const actualizar_tabla = ref(true)
provide('actualizar_tabla', actualizar_tabla)

const display = ref(false)
provide('display', display)

const deleteProductDialog = ref(false)
provide('deleteProductDialog', deleteProductDialog)

// Funciones

onMounted(() => {
  obtenerCategorias()
})

watch(actualizar_tabla, obtenerCategorias)

async function obtenerCategorias() {
  if (actualizar_tabla.value) {
    const { data } = await categoriaService.getCategorias()
    categorias.value = data
    loading.value = false
    actualizar_tabla.value = false
  }
}

function editCateory(cat: any): void {
  categoria.value = { ...cat }
  display.value = true
}

function confirmDeleteCategory(cat: any): void {
  categoria.value = cat
  deleteProductDialog.value = true
}
</script>

<script lang="ts">
export default {
  name: 'DataTableCategoria'
}
</script>

<style></style>