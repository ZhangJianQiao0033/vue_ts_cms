import { defineStore } from "pinia";
import type { ISystem } from './type.ts'
import { postUserListData } from "@/service/main/system/system.ts";
const useSystemStore = defineStore('system', {
  state: ():ISystem => ({
    userList: [],
    userTotalCount: 0
  }),
  actions: {
    async postUsersListAction() {
      const result = await postUserListData()
      this.userList = result.list
      this.userTotalCount = result.totalCount
    }
  }
})

export default useSystemStore
