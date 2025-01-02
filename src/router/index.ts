import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "../views/main/main.vue"
    },
    {
      path: "/main",
      component: () => import('@/views/main/Main.vue')
    },
    {
      path: "/login",
      component: () => import('@/views/login/Login.vue')
    },


    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

export default router
