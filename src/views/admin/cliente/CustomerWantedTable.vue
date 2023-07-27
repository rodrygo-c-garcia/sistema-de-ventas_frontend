<template>
  <DataTable tableStyle="min-width: 45vw">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>
</template>

<script lang="ts">
export default {
  name: "CustomerWantedTable"
}
</script>

