import { defineStore } from 'pinia'
import type { IAccount } from '@/types'

import {
  accountLoginRequest,
  getMenuInfoRequest,
  getUserInfoRequest
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { mapMenuToRoute } from '@/utils/map-menus'


const LOGIN_TOKEN = 'token'
interface ILoginState {
  token: string
  useInfo: any
  menuInfo: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token:  '',
    useInfo: {},
    menuInfo: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.id
      this.token = loginResult.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      this.useInfo = await getUserInfoRequest(id)
      this.menuInfo = await getMenuInfoRequest(this.useInfo.role.id)

      localCache.setCache('useInfo', this.useInfo)
      localCache.setCache('menuInfo', this.menuInfo)

      // 动态添加路由

      const routes = mapMenuToRoute(this.menuInfo)

      routes.forEach((route) => router.addRoute('main', route))

      // 页面跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const useInfo = localCache.getCache('useInfo')
      const menuInfo = localCache.getCache('menuInfo')

      if(token && useInfo && menuInfo) {
        this.token = token
        this.useInfo = useInfo
        this.menuInfo = menuInfo
        const routes = mapMenuToRoute(this.menuInfo)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  },


})

export default useLoginStore
