<template>
  <Toast />
  <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="categoria">Esta seguro de eliminar la categoria de <b>{{ categoria.nombre }}</b>?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="DeleteCategory" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, inject, toRefs } from "vue"
import type { Categoria } from '../types'
import { useToast } from 'primevue/usetoast';
import * as categoriaService from '@/services/categoria.service'

const props = defineProps({
  cat: {
    type: Object as () => Categoria,
    required: true,
  }
})

// Variables
const deleteProductDialog = ref(inject<boolean>("deleteProductDialog"))
const actualizar_tabla = ref(inject<boolean>("actualizar_tabla"))
const { cat: categoria } = toRefs(props)
const toast = useToast();


// funciones
async function DeleteCategory() {
  try {
    await categoriaService.deleteCategoria(categoria.value.id)
    toast.add({ severity: 'success', summary: 'Exito', detail: 'Categoria Eliminado', life: 3000 });
    actualizar_tabla.value = true
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al eliminar', life: 3000 });
  }
  deleteProductDialog.value = false
}
</script>

<script lang="ts">
export default {
  name: 'DeleteCategoria'
}
</script>