<template>
  <Button label="Nuevo Cliente" icon="pi pi-user-plus" @click="visible = true" />
  <Dialog v-model:visible="visible" modal :header="cliente ? 'Modificar Cliente' : 'Registrar Cliente'"
    :style="{ width: '30vw' }" class="p-fluid">
    <div class="field">
      <label for="nombre">Nombre y Apellido</label>
      <InputText id="nombre" required="true" v-model="customer.nombre_completo" />
    </div>

    <div class="field">
      <label for="email">Email</label>
      <InputText id="email" type="email" required="true" v-model="customer.email" />
    </div>
    <div class="flex justify-content-between">
      <div class="field">
        <label for="telefono">Telefono</label>
        <InputNumber id="telefono" required="true" v-model="customer.telefono" :min="60000000" :max="79999999"
          :useGrouping="false" />
      </div>
      <div class="field nit">
        <label for="nit">NIT</label>
        <InputNumber id="nit" required="true" v-model="customer.nit" :min="1000" :max="9999" :useGrouping="false" />
      </div>
    </div>
    <div class="field">
      <label for="direccion">Direccion</label>
      <InputText id="direccion" required="true" v-model="customer.direccion" />
    </div>
    <div class="field">
      <Button label="Registrar" @click="registerCustomer" />
    </div>
    {{ customer }}
  </Dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import type { Cliente } from '../types';
import * as serviceCliente from '@/services/categoria.service';
import { useToast } from 'primevue/usetoast';

// PROP
const props = defineProps({
  cliente: {
    type: Object as () => Cliente,
    required: true
  },
});

// VARIABLES REACTIVAS
const visible = ref<boolean>(false);
const { cliente: customer } = toRefs(props);

// Toast
const toast = useToast();

// FUNCIONES
function registerCustomer(): void {
  // validar los campos
  if (!customer.value.nombre_completo || !customer.value.email || !customer.value.telefono || !customer.value.nit || !customer.value.direccion) {
    // Mostrar algún mensaje de error o hacer lo que desees en caso de campos vacíos o inválidos
    return;
  }
}

const validateRequiredFields = (): void => {
  // campos requeridos
  const requiredFields = {
    nombre_completo: 'Ingrese su nombre completo',
    email: 'Ingrese su email',
    telefono: 'Ingrese su telefono',
    nit: 'Ingrese su nit',
    direccion: 'Ingrese su direccion'
  };

  for (const field in requiredFields) {
    // Aquí tipamos field como una de las claves de Cliente
    const key = field as keyof Cliente;
    if (!customer.value[key]) throw new Error(requiredFields[key]);
  }

}

const showError = (message: string): void => {
  toast.add({ severity: 'warn', summary: message, detail: 'Obligatorio', life: 3000 });
}
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
