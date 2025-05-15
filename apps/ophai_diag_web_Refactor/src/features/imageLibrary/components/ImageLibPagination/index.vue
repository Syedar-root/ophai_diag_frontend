<script setup lang="ts">
 import { useImageLibraryStore } from '@/features/imageLibrary/stores/imageLib.ts'
 import { searchImageLibQuery , handleSearchImage } from "@/features/imageLibrary/hooks/useSearchImage.ts";
 import { debounce } from 'lodash-es'
 const debounceSearchImage = debounce(handleSearchImage, 500)
 const imageLibraryStore = useImageLibraryStore()
</script>

<template>
  <div class="imageLib-pagination-container">
    <el-pagination
        v-if="imageLibraryStore.imageLibrary.items.length > 0"
        background
        :total="imageLibraryStore.imageLibrary.total"
        :page-size="searchImageLibQuery.pageSize"
        :current-page="searchImageLibQuery.pageNum"
        layout="total,prev, pager, next"
        @current-change="(page: number) => {
          searchImageLibQuery.pageNum = page
          debounceSearchImage()
        }"
    />
  </div>
</template>

<style scoped lang="scss">
.imageLib-pagination-container{
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}
</style>