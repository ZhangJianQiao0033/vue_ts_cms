import { LOGIN_TOKEN } from '@/global/constans'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue'),
      name: 'main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },

    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if(to.path.startsWith('/main')  && !token) {
    return '/login'
  }

  if(to.path === '/main' || to.path === '/main/') {
    return firstMenu?.url
  }

})
export default router
