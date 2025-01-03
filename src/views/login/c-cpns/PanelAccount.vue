<template>
  <el-form
    label-width="60px"
    :model="account"
    style="max-width: 600px"
    size="large"
    status-icon
    :rules="accoutRules"
    ref="elfromRef"
  >
    <el-form-item label="帐号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" type="password" show-password />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
// 1.绑定用户名和密码的值
const account = reactive<IAccount>({
  name: localCache.getCache("name") ?? '',
  password: localCache.getCache("password") ?? ''
})

// 2. 定义账号密码验证规则
const accoutRules: FormRules = {
  name: [
    { required: true, message: '帐户不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: '帐户为6-20位以上数字和字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: '密码为6-20位以上数字和字母组成',
      trigger: 'blur'
    }
  ]
}

// 3 点击登录的操作
const elfromRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRememberPassword: boolean) {
  
  elfromRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({name, password}).then(() => {
        if(isRememberPassword) {
          localCache.setCache("name", name)
          localCache.setCache("password", password)
        } else {
          localCache.removeCache("name")
          localCache.removeCache("password")
        }

      })


    } else {


      ElMessage.error('Oops, 账号或密码不正确')
    }
  })
}

// 将方法暴露给父组件
defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
