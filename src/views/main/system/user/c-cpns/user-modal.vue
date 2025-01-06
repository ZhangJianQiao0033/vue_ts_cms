<template>
  <div class="user-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="500" center>
      <div class="form">
        <el-form :model="formData">
          <el-form-item label="用户名" prop="name" label-width="80" size="large">
            <el-input placeholder="请输入用户名" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname" label-width="80" size="large">
            <el-input placeholder="请输入真实姓名" v-model="formData.realname" />
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="80" size="large" v-if="isNewRef">
            <el-input placeholder="请输入密码" v-model="formData.password" type="password" />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone" label-width="80" size="large">
            <el-input placeholder="请输入手机号码" v-model="formData.cellphone" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId" label-width="80" size="large">
            <el-select placeholder="请选择角色" v-model="formData.roleId">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId" label-width="80" size="large">
            <el-select placeholder="请选择部门" v-model="formData.departmentId">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

//拿到角色,部门列表
const dialogVisible = ref<boolean>(false)
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
const isNewRef = ref<boolean>(false)
const editData = ref()
function setModalVisible(isNew: boolean = true, userInfo: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (isNew) {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = ''

  } else if (userInfo) {
    // 如果是编辑用户，将 userInfo 的属性赋值给 formData
    for (const key in userInfo) {
      if (formData.hasOwnProperty(key)) {
        formData[key] = userInfo[key]
      }
    }
    editData.value = userInfo
    console.log("editData",editData.value);
  }
}

function handleConfirmClick() {
  dialogVisible.value = false
  if (isNewRef.value) {
    console.log(isNewRef.value)
    systemStore.newUserAction(formData)
  } else {
    systemStore.updateUserAction(editData.value.id, formData)
  }
}

defineExpose({ setModalVisible })
</script>

<style scoped lang="less">
.user-modal {
  .form {
    padding: 0 20px;
  }
}
</style>
