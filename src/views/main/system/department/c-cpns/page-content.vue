<template>
  <div class="user-content">
    <div class="header">
      <h2 class="title">部门列表</h2>
      <el-button type="primary" @click="handleCreateUser">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" style="width: 100%" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="部门名称" width="150" align="center" />
        <el-table-column prop="leader" label="部门领导" align="center" width="150" />
        <el-table-column prop="parentId" label="上级部门" align="center" width="130" />
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ convertUtcToBeijingTime(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ convertUtcToBeijingTime(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template #default="scope">
            <el-button type="primary" text icon="Edit" size="small" @click="editClick(scope.row)">编辑</el-button>
            <el-button text type="danger" icon="Delete" size="small" @click="deleteClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        size="default"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { convertUtcToBeijingTime } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const systemStore = useSystemStore()

const { pageList, pageTotalCount } = storeToRefs(systemStore)
console.log(pageList.value)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

//第一次调用拿到数据
fetchPageList()

function fetchPageList(queryInfo: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  systemStore.postPageListAction("department",{ size, offset, ...queryInfo })
}

function handleSizeChange() {
  fetchPageList()
}

function handleCurrentChange() {
  fetchPageList()
}

defineExpose({ fetchPageList })


// 删除功能
function deleteClick(id: number) {

  systemStore.deletePageAction("department", id)
}

//编辑功能
function editClick(pageInfo: any) {
  emit('editPage', pageInfo)
}

const emit = defineEmits(['createPage', 'editPage'])
//新建用户
function handleCreateUser() {
  emit('createPage')
}
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

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
