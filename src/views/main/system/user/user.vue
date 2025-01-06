<template>
  <div class="user">
    <UserSearch @refresh-click="refreshClick" @search-click="searchClick"/>
    <UserContent ref="contentRef" @create-user="createUserClick" @edit-user="editUserClick"/>
    <UserModal ref="modelRef"/>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue';
import UserModal from './c-cpns/user-modal.vue';
import { ref } from 'vue';


const contentRef = ref()

function refreshClick() {
  contentRef.value.fetchUserList()
}

function searchClick(searchForm: any) {
  console.log(searchForm);
  contentRef.value.fetchUserList(searchForm)
}

const modelRef = ref()
function createUserClick() {
  modelRef.value?.setModalVisible()
  console.log("createUserClick");
}


function editUserClick(userInfo: any) {
  console.log(userInfo);
  modelRef.value?.setModalVisible(false, userInfo)
}
</script>

<style lang="less" scoped>
.user {

}
</style>
