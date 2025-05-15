<script setup lang="ts">
import {useSearchNonAdminList} from "@/features/ac/hooks/useSearchNonAdminList.ts";
import {useNonAdminListStore} from "@/features/ac/store/nonAdminList.ts";

const { searchNonAdminQuery,handleSearchNonAdminList } = useSearchNonAdminList()
const nonAdminListStore = useNonAdminListStore()
const handleChangePage = () => {
  handleSearchNonAdminList();
}

</script>

<template>
  <div class="ac-pagination-container">
    <el-pagination
        v-model:current-page="searchNonAdminQuery.pageNum"
        background
        layout="total,prev,pager,next"
        :total="nonAdminListStore.nonAdminList.total"
        @click="handleChangePage()" />
  </div>

</template>

<style scoped lang="scss">
  .ac-pagination-container {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>