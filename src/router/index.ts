import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          component: HomeView
        },
        {
          path: "/categoria",
          name: "categoria",
          component: () => import("../views/admin/categoria/CategoriaView.vue"),
        },
        {
          path: "/producto",
          name: "producto",
          component: () => import("../views/admin/producto/ProductoView.vue"),
        },
        {
          path: "/pedido",
          name: "pedido",
          component: () => import("../views/admin/pedido/PedidoView.vue"),
        },
        {
          path: "/pedido/nuevo",
          name: "pedido_nuevo",
          component: () => import("../views/admin/pedido/NuevoPedidoView.vue"),
        },
        {
          path: "/cliente",
          name: "cliente",
          component: () => import("../views/admin/cliente/ClienteView.vue"),
        },
        {
          path: "/usuario",
          name: "usuario",
          component: () => import("../views/auth/usuario/UsuarioView.vue"),
        },
        {
          path: "/proveedor",
          name: "proveedor",
          component: () => import("../views/admin/proveedor/ProveedorView.vue"),
        },
      ]
    },
  ]
})

export default router
