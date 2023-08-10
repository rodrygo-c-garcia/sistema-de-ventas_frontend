<template>
  <Dialog v-model:visible="visible" modal header="Realizar Pedido" :style="{ width: '50vw' }">
    <section class="card">
      <PagoView :total="total" />
    </section>
    <section class="card">
      <ClienteSearchRegister />
    </section>
    <Button>Cerrar</Button>
  </Dialog>
</template>

<script setup lang="ts">
import { inject, ref, defineProps, toRefs, watch } from 'vue';
import PagoView from './PagoView.vue'
import ClienteSearchRegister from '../cliente/ClienteSearchRegister.vue'
import { usePinia } from '@/stores/store';
// PROPs

const props = defineProps({
  total_carrito: {
    type: Number,
    required: true
  }
})

// ATRIBUTOS
const visible = ref(inject<boolean>("visible"));
const { total_carrito: total } = toRefs(props);

// VARIBLE DE PINIA
const pinia = usePinia();

// WATCHERS
// Rastrea solo el valor de vidible
watch(visible, () => {
  pinia.customer = {
    nombre_completo: '',
    email: '',
    telefono: 0,
    nit: 0,
    direccion: ''
  };
})

// FUNCIONES

</script>

<script lang="ts">
export default {
  name: 'RealizarPedido',
}
</script>
