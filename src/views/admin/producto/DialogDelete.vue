<template>
  <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="producto">Estas seguro de eliminar <b>{{ producto.nombre }}</b>?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { toRefs, ref, inject } from 'vue'
import type { Producto } from '../types';


const props = defineProps({
  prod: {
    type: Object as () => Producto,
    required: true
  }
})
// Varibles
const deleteProductDialog = ref(inject<boolean>('deleteProductDialog'))
const { prod: producto } = toRefs(props)


// Funciones
function deleteProduct(): void {
  alert("Eliminado")
  deleteProductDialog.value = false
}

</script>

<script lang="ts">
export default {
  name: "DialogDelete",
}
</script>
<style></style>