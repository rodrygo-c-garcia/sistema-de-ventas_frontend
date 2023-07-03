<template>
  <div>
    <div class="flex justify-content-between">
      <div class="flex flex-column gap-2">
        <label for="price">Cantidad recibida:</label>
        <InputNumber inputId="horizontal" v-model="amount_received" showButtons buttonLayout="horizontal" :step="0.50"
          decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus" mode="currency" currency="USD" locale="en-US" :min="0" :max="500" />
      </div>
      <div>
        <h5>Total: {{ total_carrito }}</h5>
        <h5>Total: </h5>
        <h5>Total: </h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs } from 'vue'

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


</script>

<script lang="ts">
export default {
  name: 'PagoView'
}
</script>
