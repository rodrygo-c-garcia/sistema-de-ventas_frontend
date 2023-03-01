<template>
  <Toast />
  <div class="card">
    <!-- opciones de Categoria -->
    <Toolbar class="mb-4">
      <template #start>
        <Button label="Nueva Categoria" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
      </template>

      <template #end>
        <h5>Categoria</h5>
      </template>
    </Toolbar>
    <!-- Tabla de categorias -->
    <h5>Categoria</h5>
    <DataTable ref="dt" :value="lista_categorias" responsiveLayout="scroll" dataKey="id" @page="onPage($event)"
      :loading="loading" :paginator="true" :rows="4">
      <Column field="nombre" header="NOMBRE" :sortable="true"></Column>
      <Column field="detalle" header="DETALLE" :sortable="true"></Column>
      <Column field="created_at" header="FECHA DE CREACION" :sortable="true"></Column>
      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
            @click="editCateory(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
            @click="confirmDeleteCategory(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <!-- Agregar o actualizar categoria -->
    <Dialog v-model:visible="productDialog" :style="{ width: '450px' }"
      :header="categoria.id ? 'Modificar categoria' : 'Registrar nueva categoria'" :modal="true" class="p-fluid">
      <div class="field">
        <label for="name">Nombre</label>
        <InputText id="name" v-model.trim="categoria.nombre" required="true" autofocus
          :class="{ 'p-invalid': submitted && !categoria.nombre }" />
        <small class="p-error" v-if="submitted && !categoria.nombre">Nombre es obligatorio.</small>
      </div>
      <div class="field">
        <label for="description">Detalle</label>
        <Textarea id="description" v-model="categoria.detalle" required="true" rows="3" cols="20" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-danger" @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveCategory(categoria.id)" />
      </template>
    </Dialog>

    <!-- Eliminar categoria -->
    <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="categoria">Esta seguro de eliminar la categoria de <b>{{ categoria.nombre }}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="DeleteCategory(categoria.id)" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import * as apiCategoria from '@/services/categoria.service'
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const lista_categorias = ref([])
const loading = ref(true)
const submitted = ref(false)
const productDialog = ref(false)
const deleteProductDialog = ref(false);
const lazyParams = ref({});

const categoria = ref({
  id: 0,
  nombre: '',
  detalle: '',
});


onMounted(() => {
  ObtenerCategorias()
})


async function ObtenerCategorias() {
  const { data } = await apiCategoria.getCategorias();
  lista_categorias.value = data
  loading.value = false
}

function openNew(): void {
  categoria.value = {
    id: 0,
    nombre: '',
    detalle: ''
  };
  submitted.value = false;
  productDialog.value = true;
}

function hideDialog(): void {
  productDialog.value = false;
  submitted.value = false;
}

async function saveCategory(id_categoria: number) {
  submitted.value = true;

  if (!categoria.value.nombre.trim() || !categoria.value.detalle.trim()) {
    toast.add({ severity: 'warn', summary: 'Llene todos los campos', life: 3000 });
  } else {
    if (!id_categoria) {
      try {
        await apiCategoria.postCategoria(categoria.value)
        toast.add({ severity: 'success', summary: 'Categoria Registrada', detail: 'Revise la Lista', life: 3000 });
        ObtenerCategorias()
      } catch (e) {
        toast.add({ severity: 'error', summary: 'Hubo un error al registrar', detail: 'Intente Nuevamente', life: 3000 });
      }
    } else {
      try {
        await apiCategoria.putCategoria(categoria.value, id_categoria)
        toast.add({ severity: 'success', summary: 'Categoria Actualizada', detail: 'Revise la Lista', life: 3000 });
        ObtenerCategorias()
      } catch (e) {
        toast.add({ severity: 'error', summary: 'Hubo un error al actualizar', detail: 'Intente Nuevamente', life: 3000 });
      }
    }
    productDialog.value = false;
  }
}

function editCateory(cat: any): void {
  categoria.value = { ...cat };
  productDialog.value = true;
}

function confirmDeleteCategory(cat: any): void {
  categoria.value = cat;
  deleteProductDialog.value = true;
}

async function DeleteCategory(id: number) {
  try {
    await apiCategoria.deleteCategoria(id)
    deleteProductDialog.value = false;
    categoria.value = {
      id: 0,
      nombre: '',
      detalle: ''
    };
    toast.add({ severity: 'success', summary: 'Exito', detail: 'Categoria Eliminada', life: 3000 });
    ObtenerCategorias()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Hubo un error al actualizar', detail: 'Intente Nuevamente', life: 3000 });
  }
}

const onPage = (event: object) => {
  lazyParams.value = event;
  ObtenerCategorias()
};
</script>

<style></style>