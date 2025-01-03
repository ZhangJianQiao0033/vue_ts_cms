<template>
  <div class="header-info">
    <div class="icons">
      <span class="icon"
        ><el-icon :size="20"><Message /></el-icon
      ></span>
      <span class="icon"
        ><el-icon :size="20"><ChatDotRound /></el-icon
      ></span>
      <span class="icon"
        ><el-icon :size="20"><Search /></el-icon
      ></span>
      <div class="dot"></div>
    </div>
    <div class="user">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQHwjyiAbG7fpH6Wkv_27d-1oLpDtmtR3tju4rBGuoFRAX756PNToaviMYXdA7qht5bEYv0QmvMkyYTAXcgRrhFtcfkBaa1G59V39cdq80L"
          />
          <span class="name">{{ loginStore.useInfo.name }}</span>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constans';
import router from '@/router';
import useLoginStore from '@/store/login/login';
import { localCache } from '@/utils/cache';

const loginStore = useLoginStore()

function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  height: 100%;
  display: flex;
  align-items: center;

  .icons {
    margin-right: 20px;
    padding-top: 5px;
    position: relative;
    .icon {
      padding: 0px 10px;
    }
    .dot {
      position: absolute;
      top: 2px;
      left: 70px;
      width: 5px;
      height: 5px;
      background-color: red;
      border-radius: 50%;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 15px;
    .name {
      margin-left: 5px;
    }
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
