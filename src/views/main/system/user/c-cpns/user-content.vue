<template>
  <div class="user-content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" style="width: 100%" border >
        <el-table-column type="selection" width="55" align="center"  />
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column
          prop="name"
          label="用户名"
          width="150"
          align="center"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          align="center"
          width="150"
        />
        <el-table-column prop="cellphone" label="手机号码" align="center" width="130" />
        <el-table-column prop="enable" label="状态" align="center" width="100" />
        <el-table-column prop="createAt" label="创建时间" align="center" />
        <el-table-column prop="updateAt" label="更新时间" align="center" />
        <el-table-column label="操作" align="center" width="150">
          <el-button type="primary" text icon="Edit" size="small"
            >编辑</el-button
          >
          <el-button text type="danger" icon="Delete" size="small"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="div">分页</div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

const systemStore = useSystemStore()
systemStore.postUsersListAction()
const { userList } = storeToRefs(systemStore)
console.log(userList.value)
</script>

<style scoped lang="less">
.user-content {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 22px;
    }
  }

  .table {
    margin-top: 20px;
  }

  :deep(.el-button--small) {
    padding: 0px 3px;
  }
  :deep(.el-table__cell) {
    padding: 15px 0;
  }
}
</style>
