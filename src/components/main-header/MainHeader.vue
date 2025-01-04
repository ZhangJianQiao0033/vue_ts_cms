<template>
  <div class="main-header">
    <div class="menu-icon" >
      <div class="icon" @click="handleMenuIconClick">
        <el-icon size="28px">
          <component :is="isFold ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <template v-for="item in breadcrumbs">
            <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content">
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import HeaderInfo from './c-cpns/HeaderInfo.vue'
import { useRoute } from 'vue-router'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import useLoginStore from '@/store/login/login'

const isFold = ref(false)
const emit = defineEmits(['foldChange'])
function handleMenuIconClick() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

const menuInfo = useLoginStore().menuInfo
//拿到面包屑
const route = useRoute()
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, menuInfo)
})


</script>

<style scoped lang="less">
.main-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .menu-icon {
    cursor: pointer;
    display: flex;
    align-items: center;

    .icon {
      padding-top: 3px;
    }
    .breadcrumb {
      margin-left: 10px;
    }
  }
}
</style>
