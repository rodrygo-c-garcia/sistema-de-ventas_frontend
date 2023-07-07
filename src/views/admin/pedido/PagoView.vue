<template>
  <div>
    <div class="flex justify-content-between align-items-center">
      <div class="flex flex-column gap-2">
        <label for="price">Cantidad recibida:</label>
        <InputNumber inputId="horizontal" v-model="amount_received" showButtons buttonLayout="horizontal" :step="0.50"
          decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus" mode="currency" currency="USD" locale="en-US" :min="0" :max="2000" />
      </div>
      <div>
        <h5>Total: $ {{ total_carrito }}</h5>
        <h5>Pago: $ {{ amount_received }}</h5>
        <h5>Cambio: $ {{ change }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs, watch } from 'vue'

// PROPs

const props = defineProps({
  total: {
    type: Number,
    required: true
  }
})

const { total: total_carrito } = toRefs(props);

// Variables
const amount_received = ref<number>(0);
const change = ref<number>(0);


// Watcher
watch(amount_received, (newValue, oldValue) => {
  // Actualizar el valor de 'change'
  change.value = (newValue > total_carrito.value) ? (newValue - total_carrito.value) : 0;
});

</script>

<script lang="ts">
export default {
  name: 'PagoView'
}
</script>
