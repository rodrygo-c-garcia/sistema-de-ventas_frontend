<template>
  <Dialog v-model:visible="productDialog" :style="{ width: '450px' }"
    :header="categoria.id ? 'Modificar categoria' : 'Registrar nueva categoria'" :modal="true" class="p-fluid">
    <div class="field">
      <label for="name">Nombre</label>
      <InputText id="name" v-model.trim="categoria.nombre" required="true" autofocus
        :class="{ 'p-invalid': submitted && !categoria.nombre }" />
      <small class="p-error" v-if="submitted && !categoria.nombre">Nombre es obligatorio.</small>
    </div>
    <div class="field">
      <label for="description">Detalle</label>
      <Textarea id="description" v-model="categoria.detalle" required="true" rows="3" cols="20" />
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-danger" @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="saveCategory(categoria.id)" />
    </template>
  </Dialog>
</template>

<script lang="ts">
export default {
  name: 'DialogCategoria'
}
</script>

<style></style>