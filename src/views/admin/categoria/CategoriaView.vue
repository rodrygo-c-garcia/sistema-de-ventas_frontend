<template>
  <div class="card">
    <h5>Single Column</h5>
    <DataTable :value="lista_categorias" responsiveLayout="scroll">
      <Column field="nombre" header="Nombre" :sortable="true"></Column>
      <Column field="detalle" header="Detalle" :sortable="true"></Column>
      <Column field="created_at" header="Fecha de Creacion" :sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import * as apiCategoria from '@/services/categoria.service'
import { onMounted, ref } from 'vue';

const lista_categorias = ref([])



</script>

<style></style>