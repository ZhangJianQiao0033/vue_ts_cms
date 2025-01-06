import { defineStore } from "pinia";
import type { ISystem } from './type.ts'
import { deleteUserData, newUserData, postUserListData, updateUserData } from "@/service/main/system/system.ts";
const useSystemStore = defineStore('system', {
  state: ():ISystem => ({
    userList: [],
    userTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const result = await postUserListData(queryInfo)
      this.userList = result.list
      this.userTotalCount = result.totalCount
    },
    async deleteUserAction(id: number) {
      const result = await deleteUserData(id)

      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserAction(userInfo: any) {
      const result = await newUserData(userInfo)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async updateUserAction(id: number, userInfo: any) {

      const result = await updateUserData(id, userInfo)
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
