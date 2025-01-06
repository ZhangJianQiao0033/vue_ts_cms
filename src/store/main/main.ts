import { postDepartmentList, postRoleList } from "@/service/main/main";
import { defineStore } from "pinia";
interface IMainStore {
  entireRoles: any[],
  entireDepartments: any[]
}

const useMainStore = defineStore("main",{
  state: (): IMainStore => ({
    entireRoles: [],
    entireDepartments: [],
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleResult = await postRoleList()
      const departmentResult = await postDepartmentList()
      this.entireRoles = roleResult.list
      this.entireDepartments = departmentResult.list
    }
  }
})

export default useMainStore
