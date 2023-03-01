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

</script>

<script lang="ts">
export default {
  name: 'ToolbarCategoria'
}
</script>

<style></style>