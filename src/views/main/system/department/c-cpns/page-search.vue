<template>
  <div class="page-search">
    <el-form label-width="80px" size="large" ref="form" :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入查询的部门名称" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入查询的领导名称" v-model="searchForm.leader" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="button">
      <el-button size="large" icon="Refresh" @click="refreshClick">重置</el-button>
      <el-button type="primary" size="large" icon="Search" @click="searchClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { normalizeSearchForm } from '@/utils/format'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const form = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})
const emit = defineEmits(['refreshClick', 'searchClick'])
function refreshClick() {
  form.value?.resetFields()
  emit('refreshClick')
}

function searchClick() {
  normalizeSearchForm(searchForm)
  emit('searchClick', searchForm)
}
</script>

<style scoped lang="less">
.page-search {
  border-top-left-radius: 10px; /* 左上角圆角 */
  border-top-right-radius: 10px; /* 右上角圆角 */
  background-color: #fff;
  padding: 20px;

  .el-form {
    .el-form-item {
      padding: 20px 30px;
      margin-top: 0;
    }
    :deep(.el-form-item--large) {
      margin-bottom: 0;
    }
  }

  .button {
    padding-right: 50px;
    padding-bottom: 10px;
    text-align: right;
  }
}
</style>
