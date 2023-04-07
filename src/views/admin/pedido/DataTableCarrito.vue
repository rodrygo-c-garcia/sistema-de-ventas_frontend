<template>
  <h5>Carrito</h5>
  {{ carrito }}
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';

const props = defineProps({
  car: {
    type: Object,
    required: false
  }
})

const { car: carrito } = toRefs(props)

</script>

<script lang="ts">
export default {
  name: 'DataTableCarrito'
}
</script>