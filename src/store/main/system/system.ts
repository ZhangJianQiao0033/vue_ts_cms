import { defineStore } from "pinia";
import type { ISystem } from './type.ts'
import { deletePageData, deleteUserData, newPageData, newUserData, postPageListData, postUserListData, updatePageData, updateUserData } from "@/service/main/system/system.ts";
const useSystemStore = defineStore('system', {
  state: ():ISystem => ({
    userList: [],
    userTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
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
    },


    //抽取成公共部分的action
    async postPageListAction(path: string, queryInfo: any) {
      const result = await postPageListData(path, queryInfo)
      this.pageList = result.list
      this.pageTotalCount = result.totalCount
      console.log(result);
    },
    async deletePageAction(path: string, id: number) {
      const result = await deletePageData(path, id)
      this.postPageListAction(path, { offset: 0, size: 10 })
    },
    async newPageAction(path: string, pageInfo: any) {
      const result = await newPageData(path, pageInfo)
      this.postPageListAction(path, { offset: 0, size: 10 })
    },
    async updatePageAction(path: string, id: number, userInfo: any) {

      const result = await updatePageData(path, id, userInfo)
      this.postPageListAction(path, { offset: 0, size: 10 })
    },
  }
})

export default useSystemStore
