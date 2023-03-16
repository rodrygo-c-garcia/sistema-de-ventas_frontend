<template>
  <Dialog v-model:visible="props.visible" :modal="true" class="p-fluid model-loading" :closable="false"
    :style="{ width: '350px' }">
    <div class="container-loading">
      <div class="loader"></div>
      <p class="cargando">Cargando...</p>
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
  animation: spin 1.2s linear infinite;
}

.loader::before,
.loader::after {
  content: '';
  position: absolute;
  border-radius: inherit;
}

.loader::before {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, rgb(161, 245, 140) 0%, rgb(48, 8, 160) 100%);
}

.loader::after {
  width: 85%;
  height: 85%;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.cargando {
  font-size: 20px;
  font-family: sans-serif;
}
</style>