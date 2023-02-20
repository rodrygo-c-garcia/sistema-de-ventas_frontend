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
          component: () => import("../views/admin/categoria/Categoria.vue"),
        },
        {
          path: "/producto",
          name: "producto",
          component: () => import("../views/admin/producto/Producto.vue"),
        },
        {
          path: "/pedido",
          name: "pedido",
          component: () => import("../views/admin/pedido/Pedido.vue"),
        },
        {
          path: "/pedido/nuevo",
          name: "pedido_nuevo",
          component: () => import("../views/admin/pedido/NuevoPedido.vue"),
        },
        {
          path: "/cliente",
          name: "cliente",
          component: () => import("../views/admin/cliente/Cliente.vue"),
        },
        {
          path: "/usuario",
          name: "usuario",
          component: () => import("../views/auth/usuario/Usuario.vue"),
        },
      ]
    },
  ]
})

export default router
