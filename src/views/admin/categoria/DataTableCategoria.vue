<template>
  <h5>Categoria</h5>
  <DataTable ref="dt" :value="categorias" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="5"
    :filters="filters" :loading="loading"
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
</template>

<script setup lang="ts">
import type { Categoria } from '../types';
import { ref, onMounted } from 'vue'

// variables
const categorias = ref(<Categoria>({}))

onMounted(() => {
})



</script>

<script lang="ts">
export default {
  name: 'DataTableCategoria'
}
</script>

<style></style>