<script setup lang="ts">
import { usePinia } from './stores/store';
const pinia = usePinia()

const user = localStorage.getItem('user');
if (user !== null) {
  pinia.changeUser(JSON.parse(user));
}

// Borramos los items cada vez que se cierre la ventana (Caso de Cerrar la ventana)
// localStorage.removeItem('token');
// localStorage.removeItem('user');

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
