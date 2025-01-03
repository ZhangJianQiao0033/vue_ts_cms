<template>
  <div class="main">
    <h2>main</h2>
    <button @click="loginOutClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constans';
import router from '@/router';
import { localCache } from '@/utils/cache';

function loginOutClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}


</script>

<style scoped lang="less">
.main {

}
</style>
