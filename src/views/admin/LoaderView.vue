<template>
  <Dialog v-model:visible="props.visible" :modal="true" class="p-fluid model-loading" :closable="false"
    :style="{ width: '450px' }">
    <p class="border">Cargando</p>
    <p class="mave">Cargando</p>
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

<style></style>