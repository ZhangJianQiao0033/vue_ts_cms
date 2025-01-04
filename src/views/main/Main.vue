<template>
  <div class="main">
    <el-container class="content-container">
      <el-aside :width="isFold ? ' 60px' : '210px'">
        <MainMenu :isCollapse="isFold" />
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <el-config-provider :locale="zhCn">
            <RouterView />
          </el-config-provider>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/main-header/MainHeader.vue'
import MainMenu from '@/components/main-menu/MainMenu.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ref } from 'vue'

const isFold = ref(false)

function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style scoped lang="less">
.main {
  height: 100%;

  .content-container {
    height: 100%;

    .el-aside {
      overflow: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 和 Edge */

      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }

      transition: width 0.3s ease;
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }

  .el-header {
    --el-header-height: 50px;
  }
}
</style>
