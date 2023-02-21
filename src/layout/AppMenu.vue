<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Admin',
        items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Gestion de Productos',
        items: [
            { label: 'Categorias', icon: 'pi pi-fw pi-id-card', to: '/categoria' },
            { label: 'Productos', icon: 'pi pi-fw pi-check-square', to: '/producto' },
        ]
    },
    {
        label: 'Gestion de Pedidos',
        items: [
            { label: 'Lista de Pedidos', icon: 'pi pi-fw pi-eye', to: '/pedido', badge: 'NEW' },
            { label: 'Nuevo Pedido', icon: 'pi pi-fw pi-globe', to: '/pedido/nuevo', badge: 'NEW' },
            { label: 'Clientes', icon: 'pi pi-fw pi-desktop', to: '/cliente', badge: 'NEW' },
        ]
    },
    {
        label: 'Gestion de Usuario',
        items: [
            { label: 'Proveedor', icon: 'pi pi-fw pi-prime', to: '/proveedor' },
            { label: 'Roles', icon: 'pi pi-fw pi-prime', to: '#' },
            { label: 'Usuarios', icon: 'pi pi-fw pi-desktop', to: '/usuario' }
        ]
    },

]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>
