<script setup lang="ts">
import { usePinia } from '@/stores/store'
const pinia = usePinia();
</script>

<template>
  <main>
    <div>Home</div>
    <h4>Bienvenido {{ pinia.user?.name }}</h4>
  </main>
</template>
