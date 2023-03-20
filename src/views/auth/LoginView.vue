<template>
  <Toast position="top-right" />
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div
        style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <!-- Preguntamos si existe el User -->
            <div class="text-900 text-3xl font-medium mb-3">Bienvenid@!</div>
            <span class="text-600 font-medium">Iniciar sesion para continuar</span>
          </div>
          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5"
              style="padding: 1rem" v-model="usuario.email" />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true"
              class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <div class="flex align-items-center">
                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                <label for="rememberme1">Recordarme</label>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)">Olvido su contraseña?</a>
            </div>
            <Button label="Sign In" class="w-full p-3 text-xl" @:click='login'></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>

<script setup lang="ts">
import AppConfig from '@/layout/AppConfig.vue';
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue'
import { useToast } from "primevue/usetoast"
import * as userService from '@/services/login.service'
import { useRouter } from 'vue-router'
import { usePinia } from '@/stores/store'

const toast = useToast();
const { layoutConfig, contextPath } = useLayout();
const checked = ref(false);
const router = useRouter()
const logoUrl = computed(() => {
  return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

// LOGIN VIEW
const usuario = ref({
  email: '',
  password: ''
})

async function login() {
  const { data } = await userService.login(usuario.value)

  if (!data.error) {
    const pinia = usePinia();
    // establecemos nuestro token(encriptado) y usuario(comvertido a string) en localStorage
    localStorage.setItem('token', window.btoa(data.access_token))
    localStorage.setItem('user', JSON.stringify(data.user))
    // actualizamos el usuario con Pinia
    pinia.changeUser(data.user)
    // redireccionamos al home
    router.push({ name: 'home' })
  } else
    toast.add({ severity: 'error', summary: 'Error', detail: 'Datos erroneos', life: 3000 });
}
</script>
<style></style>