<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号密码</span>
            </div>
          </template>
          <PanelAccount ref="panelAccountRef"/>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          321
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large"
      @click="loginClick">立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import PanelAccount from './PanelAccount.vue'

const isRememberPassword = ref(false)
const activeName = ref('account')

// 调用子组件的方法得到帐户密码
const panelAccountRef = ref<InstanceType<typeof PanelAccount>>()

function loginClick() {
  if(activeName.value === 'account') {
    panelAccountRef.value?.loginAction()
  } else {
    console.log("手机验证码登录");
  }
}


</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }

  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        margin-left: 5px;
      }
    }
  }
}
</style>
