<template>
  <Dialog v-model:visible="visible" modal header="Realizar Pedido" :style="{ width: '50vw' }">
    <section class="card">
      <PagoView />
    </section>
    <section class="card">
      <ClienteView />
    </section>
  </Dialog>
  {{ visible }}
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import PagoView from './PagoView.vue'
import ClienteView from '../cliente/ClienteView.vue'

// ATRIBUTOS
const visible = ref(inject<boolean>("visible"));

// FUNCIONES

</script>

<script lang="ts">
export default {
  name: 'RealizarPedido',
}
</script>
