<template>
  <Toolbar class="mb-4">
    <template #start>
      <Button label="Nueva Categoria" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
    </template>
    <template #end>
      <h5>Categoria</h5>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import type { Categoria } from '../types';

// Varibles
const display = ref(false)
provide('display', display)
const categoria = ref(<Categoria>({}))

// funciones
function openNew(): void {
  categoria.value = {
    id: 0,
    nombre: '',
    detalle: ''
  };
  display.value = true
  alert(display.value)
}
</script>

<script lang="ts">
export default {
  name: 'ToolbarCategoria'
}
</script>

<style></style>