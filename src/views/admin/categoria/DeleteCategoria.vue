<template>
  <Dialog v-model:visible="display" :style="{ width: '450px' }" header="Confirmar" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="categoria">Esta seguro de eliminar la categoria de <b>{{ categoria.nombre }}</b>?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="DeleteCategory(categoria.id)" />
    </template>
  </Dialog>
</template>

<script lang="ts">
export default {
  name: 'DeleteCategoria'
}
</script>

<style></style>