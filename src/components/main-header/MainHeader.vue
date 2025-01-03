<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">

        <component :is="isFold ?  'Expand' : 'Fold' "/>
      </el-icon>

    </div>
    <div class="content">
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderInfo from './c-cpns/HeaderInfo.vue'

const isFold = ref(false)
const emit = defineEmits(['foldChange'])
function handleMenuIconClick() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

</script>

<style scoped lang="less">
.main-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .menu-icon {
    cursor: pointer;
  }
}
</style>
