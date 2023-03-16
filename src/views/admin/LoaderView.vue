<template>
  <Dialog v-model:visible="props.visible" :modal="true" class="p-fluid model-loading" :closable="false"
    :style="{ width: '450px' }">
    <div class="container-loading">
      <div class="loader"></div>
      <p>Cargando</p>
    </div>
  </Dialog>
  {{ props.msg }}
</template>

<script setup lang="ts">

const props = defineProps({
  msg: { type: String },
  visible: { type: Boolean }
})

</script>

<script lang="ts">
export default {
  name: 'LoaderView'
}
</script>

<style>
.container-loading {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.loader {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgb(27, 20, 129);
  border-top-color: transparent;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>