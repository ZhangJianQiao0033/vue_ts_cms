<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="">
      <div class="title">逸尘管理系统</div>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        background-color="#001529"
        text-color="#b7bdc3"
        active-text-color="#fff"
        :collapse="isCollapse"
      >
      <template v-for="item in loginStore.menuInfo">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]"/>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <template v-for="subItem in item.children">
            <el-menu-item :index="subItem.id + ''" @click="handleItemClick(subItem)">
              {{ subItem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import useLoginStore from '@/store/login/login';
import { mapPathToMenu } from '@/utils/map-menus';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()



function handleItemClick(subItem: any) {
  router.push(subItem.url)
}

const route = useRoute()
// const menu = mapPathToMenu(route.path, loginStore.menuInfo)
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, loginStore.menuInfo)
  return pathMenu.id + ''
})

</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    padding: 12px 10px 8px;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    height: 28px;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
      margin-left: 2px;
    }
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
