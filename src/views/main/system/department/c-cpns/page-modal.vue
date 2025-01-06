<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建部门' : '编辑部门'" width="500" center>
      <div class="form">
        <el-form :model="formData">
          <el-form-item label="部门名称" prop="name" label-width="80" size="large">
            <el-input placeholder="请输入部门名称" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader" label-width="80" size="large">
            <el-input placeholder="请输入部门领导" v-model="formData.leader" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId" label-width="80" size="large">
            <el-select placeholder="请选择部门" v-model="formData.parentId">
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
  leader: '',
  parentId: ''
})

//拿到角色,部门列表
const dialogVisible = ref<boolean>(false)
const mainStore = useMainStore()
const systemStore = useSystemStore()
const {  entireDepartments } = storeToRefs(mainStore)
const isNewRef = ref<boolean>(false)
const editData = ref()
function setModalVisible(isNew: boolean = true, pageInfo: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (isNew) {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = ''

  } else if (pageInfo) {
    // 如果是编辑用户，将 userInfo 的属性赋值给 formData
    for (const key in pageInfo) {
      if (formData.hasOwnProperty(key)) {
        formData[key] = pageInfo[key]
      }
    }
    editData.value = pageInfo
    console.log("editData",editData.value);
  }
}

function handleConfirmClick() {
  dialogVisible.value = false
  if (isNewRef.value) {
    console.log(isNewRef.value)
    systemStore.newPageAction('department', formData)
  } else {
    systemStore.updatePageAction('department', editData.value.id, formData)
  }
}

defineExpose({ setModalVisible })
</script>

<style scoped lang="less">
.page-modal {
  .form {
    padding: 0 20px;
  }
}
</style>
