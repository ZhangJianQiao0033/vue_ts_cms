import { defineStore } from "pinia";
import type { IAccount } from "@/types";

import { accountLoginRequest } from "@/service/login/login";
import { localCache } from "@/utils/cache";
import router from "@/router";
const LOGIN_TOKEN = 'token'
const useLoginStore = defineStore("login",{
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async  loginAccountAction(account: IAccount ) {

      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.id
      this.name = loginResult.name
      this.token = loginResult.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 页面跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
