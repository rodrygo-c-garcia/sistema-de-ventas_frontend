<template>
  <Button label="Nuevo Cliente" icon="pi pi-user-plus" @click="visible = true" />
  <Dialog v-model:visible="visible" modal :header="cliente ? 'Modificar Cliente' : 'Registrar Cliente'"
    :style="{ width: '30vw' }" class="p-fluid">
    <div class="field">
      <label for="nombre">Nombre y Apellido</label>
      <InputText id="nombre" required="true" />
    </div>
    <div class="field">
      <label for="email">Email</label>
      <InputText id="email" type="email" required="true" />
    </div>
    <div class="flex justify-content-between">
      <div class="field">
        <label for="telefono">Telefono</label>
        <InputNumber id="telefono" required="true" />
      </div>
      <div class="field nit">
        <label for="nit">NIT</label>
        <InputNumber id="nit" required="true" />
      </div>
    </div>
    <div class="field">
      <label for="direccion">Direccion</label>
      <InputText id="direccion" required="true" />
    </div>
    <div class="field">
      <Button label="Registrar" @click="visible = true" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Cliente } from '../types';

// PROP
const { cliente } = defineProps({
  cliente: {
    type: Object as () => Cliente | null,
    default: null,
  },
});

// VARIABLES REACTIVAS
const visible = ref<boolean>(false);
</script>


<script lang="ts">
export default {
  name: "RegisterCliente"
}
</script>

<style>
.nit {
  width: 100px;
}
</style>
