import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: { requireAuth: true},
      children: [
        {
          path: '/',
          name: "home",
          component: HomeView
        },
        {
          path: "/categoria",
          name: "categoria",
          component: () => import("@/views/admin/categoria/CategoriaView.vue"),
        },
        {
          path: "/producto",
          name: "producto",
          component: () => import("@/views/admin/producto/ProductoView.vue"),
        },
        {
          path: "/pedido",
          name: "pedido",
          component: () => import("@/views/admin/pedido/PedidoView.vue"),
        },
        {
          path: "/pedido/nuevo",
          name: "pedido_nuevo",
          component: () => import("@/views/admin/pedido/NuevoPedidoView.vue"),
        },
        {
          path: "/cliente",
          name: "cliente",
          component: () => import("@/views/admin/cliente/ClienteView.vue"),
        },
        {
          path: "/usuario",
          name: "usuario",
          component: () => import("@/views/auth/usuario/UsuarioView.vue"),
        },
      ]
    },
      // ruta inicial Login
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
    },
  ]
})

// hook de navegación global que se ejecuta en cada transición de ruta
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(to.meta.requireAuth){
    try {
      let token: string = '';
      const token64 = localStorage.getItem('token');
      // si esque existe el token desincretamos
      if(token64 !== null)  token = window.atob(token64);
      token.length > 3 ? next() : next({name: 'login'})
    } catch(e) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      next({name: 'login'});
    }
  }
  else next();
})

export default router
