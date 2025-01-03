import { defineStore } from "pinia";
import type { IAccount } from "@/types";

import { accountLoginRequest, getMenuInfoRequest, getUserInfoRequest } from "@/service/login/login";
import { localCache } from "@/utils/cache";
import router from "@/router";
const LOGIN_TOKEN = 'token'
interface ILoginState  {
  token: string
  useInfo: any
  menuInfo: any
  
}
const useLoginStore = defineStore("login",{
  state: (): ILoginState => ({


    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    useInfo: localCache.getCache("useInfo"),
    menuInfo: localCache.getCache("menuInfo")
  }),
  actions: {
    async  loginAccountAction(account: IAccount ) {

      const loginResult = await accountLoginRequest(account)
      const id = loginResult.id
      this.token = loginResult.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      this.useInfo = await getUserInfoRequest(id)
      this.menuInfo = await getMenuInfoRequest(this.useInfo.role.id)

      localCache.setCache("useInfo", this.useInfo)
      localCache.setCache("menuInfo", this.menuInfo)
      // 页面跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
