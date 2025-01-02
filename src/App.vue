<script setup lang="ts">
import useCounterStore from './store/counter';

const counterStore = useCounterStore()

function changeCounter() {
  counterStore.changeCounterAction(999)
}
</script>

<template>
  <h1>App</h1>
  <RouterLink to="/main">首页</RouterLink>
  <RouterLink to="/login">登录</RouterLink>

  <RouterView />

  <h2>counter: {{ counterStore.counter }} - {{ counterStore.getDoubleCounter }}</h2>
  <button @click="changeCounter">修改counter</button>
</template>

<style scoped>

</style>
