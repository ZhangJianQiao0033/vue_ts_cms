<template>
  <el-form
    label-width="60px"
    style="max-width: 600px"
    size="large"
    status-icon
    ref="elfromRef"
    :model="verificationData"
  >
    <el-form-item label="电话" prop="phoneNumber">
      <el-input v-model="verificationData.phoneNumber"/>
    </el-form-item>

      <el-form-item label="验证码" prop="verificationCode">
        <div class="verification-code">
          <el-input v-model="verificationData.verificationCode" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>

      </el-form-item>

  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const verificationData = reactive({
  phoneNumber: "",
  verificationCode: "",
})

</script>

<style scoped lang="less">
.verification-code {
  display: flex;

  .get-btn {
    margin-left: 7px;
  }
}
</style>
