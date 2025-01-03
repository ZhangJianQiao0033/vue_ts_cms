<template>
  <div class="login">
    <LoginPanel />

  </div>
</template>

<script setup lang="ts">
import LoginPanel from './c-cpns/LoginPanel.vue';


</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background: url('../../assets/img/login-bg.svg');
}
</style>
