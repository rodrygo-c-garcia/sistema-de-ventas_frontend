<template>
  <Toast />
  <Dialog v-model:visible="display" :style="{ width: '450px' }"
    :header="categoria.id ? 'Modificar categoria' : 'Registrar nueva categoria'" :modal="true" class="p-fluid">
    <div class="field">
      <label for="name">Nombre</label>
      <InputText id="name" v-model.trim="categoria.nombre" required="true" autofocus />
    </div>
    <div class="field">
      <label for="description">Detalle</label>
      <Textarea id="description" v-model="categoria.detalle" required="true" rows="3" cols="20" />
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-danger" @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="saveCategory" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, inject, toRefs } from 'vue'
import type { Categoria } from '../types';
import { useToast } from 'primevue/usetoast';
import * as categoriaService from '@/services/categoria.service'

const props = defineProps({
  cat: {
    type: Object as () => Categoria,
    required: true
  }
})

// varibles
const { cat: categoria } = toRefs(props)
const display = ref(inject<boolean>('display'))
const actualizar_tabla = ref(inject<boolean>('actualizar_tabla'))
const submitted = ref(false)
const toast = useToast();


// Funciones
const hideDialog = (): void => {
  display.value = false;
  submitted.value = false;
};

const saveCategory = async () => {
  submitted.value = true;
  if (categoria.value.nombre.trim()) {
    // editamos
    if (categoria.value.id) {
      await categoriaService.putCategoria(categoria.value, categoria.value.id)
      toast.add({ severity: 'success', summary: 'Exito', detail: 'Categoria Modificado', life: 3000 });
    } else { // registramos
      await categoriaService.postCategoria(categoria.value)
      toast.add({ severity: 'success', summary: 'Exito', detail: 'Categoria Registrado', life: 3000 });
    }
    display.value = false
    actualizar_tabla.value = true
  } else toast.add({ severity: 'warn', summary: 'Llene el campo Nombre', detail: 'Obligatorio', life: 3000 });
}
</script>

<script lang="ts">
export default {
  name: 'DialogCategoria'
}
</script>
