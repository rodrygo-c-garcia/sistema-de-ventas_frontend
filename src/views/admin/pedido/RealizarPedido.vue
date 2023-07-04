<template>
  <Dialog v-model:visible="visible" modal header="Realizar Pedido" :style="{ width: '50vw' }">
    <section class="card">
      <PagoView :total="total" />
    </section>
    <section class="card">
      <ClienteView />
    </section>
    <Button>Cerrar</Button>
  </Dialog>
</template>

<script setup lang="ts">
import { inject, ref, defineProps, toRefs } from 'vue';
import PagoView from './PagoView.vue'
import ClienteView from '../cliente/ClienteView.vue'

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



// FUNCIONES

</script>

<script lang="ts">
export default {
  name: 'RealizarPedido',
}
</script>
