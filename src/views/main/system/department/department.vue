<template>
  <div class="department">
    <PageSearch @refresh-click="refreshClick" @search-click="searchClick" :searchConfig = "searchConfig" />
    <PageContent ref="contentRef" @create-page="createPageClick" @edit-page="editPageClick"/>
    <PageModal ref="modelRef"/>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from './c-cpns/page-content.vue';
import PageModal from './c-cpns/page-modal.vue';
import { ref } from 'vue';
import searchConfig from './config/search.config';

const contentRef = ref()

function refreshClick() {
  contentRef.value.fetchPageList()
}

function searchClick(searchForm: any) {
  console.log(searchForm);
  contentRef.value.fetchPageList(searchForm)
}

const modelRef = ref()
function createPageClick() {
  modelRef.value?.setModalVisible()

}


function editPageClick(pageInfo: any) {
  // console.log(pageInfo);
  modelRef.value?.setModalVisible(false, pageInfo)
}
</script>

<style lang="less" scoped>
.department {

}
</style>
