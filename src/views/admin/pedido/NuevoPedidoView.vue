<template>
  <div>
    <h3>Nuevo Pedido</h3>
    <h6>User: {{ pinia.user?.name }}</h6>
    <h6>Email: {{ pinia.user?.email }}</h6>
    {{ pinia.user }}
  </div>
</template>

<script setup lang="ts">
import { usePinia } from '@/stores/store'
const pinia = usePinia();
</script>

<style></style>