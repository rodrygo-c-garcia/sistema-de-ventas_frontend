<template>
  <div>
    <div class="flex justify-content-left">
      <div class="flex flex-column gap-2">
        <label for="price">Cantidad recibida:</label>
        <InputNumber inputId="horizontal" v-model="amount_received" showButtons buttonLayout="horizontal" :step="0.50"
          decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus" mode="currency" currency="USD" locale="en-US" :min="0" :max="500" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Variables
const amount_received = ref<number>(0);


</script>

<script lang="ts">
export default {
  name: 'PagoView'
}
</script>
