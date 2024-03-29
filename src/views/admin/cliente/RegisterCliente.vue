<template>
  <Toast />
  <LoaderView msg="Guardando Cliente" :visible="loading_conexion_API" />

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
          :useGrouping="false" placeholder="00000000" />
      </div>
      <div class="field nit">
        <label for="nit">NIT</label>
        <InputNumber id="nit" required="true" v-model="customer.nit" :min="1000" :max="9999" :useGrouping="false"
          placeholder="0000" />
      </div>
    </div>
    <div class="field">
      <label for="direccion">Direccion</label>
      <InputText id="direccion" required="true" v-model="customer.direccion" />
    </div>
    <div class="field">
      <Button label="Guardar" @click="(isEditing ? updateCustomer() : registerCustomer())" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import type { Cliente } from '../types';
import * as serviceCliente from '@/services/cliente.service';
import { useToast } from 'primevue/usetoast';
import { usePinia } from '@/stores/store';
import LoaderView from '../LoaderView.vue';

// PROP
const props = defineProps({
  cliente: {
    type: Object as () => Cliente,
    required: false
  },
});

// VARIABLES REACTIVAS
const visible = ref<boolean>(false);
const customer = ref<Cliente>({
  nombre_completo: '',
  email: '',
  telefono: 0,
  nit: 0,
  direccion: ''
});
const isEditing = ref<boolean>(false); // Esta es la variable que indica si estamos editando o no
const loading_conexion_API = ref<boolean>(false)


// Toast
const toast = useToast();

// WATCHERS
// escucha los cambios que hay en el prop cliente, se usa para editar
watch(() => props.cliente, (newValue) => {
  // Si hay un nuevo valor de cliente, lo asignamos a la variable reactiva y ponemos isEditing en true
  if (newValue) {
    customer.value = newValue;
    isEditing.value = true;
  }
});

// watchEffect para poner en vacio los inputs desdepues de cerrar
watchEffect(() => {
  if (!visible.value) {
    customer.value = {
      nombre_completo: '',
      email: '',
      telefono: 0,
      nit: 0,
      direccion: ''
    }
  }
});

// FUNCIONES
async function registerCustomer(): Promise<void> {
  // validar los campos
  try {
    // iniciamos la carga del guardado
    loading_conexion_API.value = true;
    // VARIBLE DE PINIA
    const pinia = usePinia();
    validateRequiredFields();
    await serviceCliente.postCliente(customer.value);
    toast.add({ severity: 'success', summary: "Exito", detail: 'Cliente Registrado', life: 3000 });
    pinia.changeCustomer(customer.value);
  } catch (error: unknown) {
    showError((error as Error).message)
  } finally {
    // cerrarmos el guardado cuando termine de guardar
    loading_conexion_API.value = false;
    visible.value = false;
  }
}

function updateCustomer(): void {
  alert("Modificar")
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
