<template>
  <div class="cm-container" v-loading="loading">
    <CmSearch></CmSearch>
    <CmTable></CmTable>
    <div class="cm-footer">
      <el-pagination
        v-model:current-page="searchQueryStore.searchQuery.pageNum"
        background
        layout="total,prev,pager,next"
        :total="caseListStore.caseList.total"
        @click="handleSearch(true)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import CmSearch from '@/features/cm/components/CmSearch/CmSearch.vue'
  import CmTable from '@/features/cm/components/CmTable/CmTable.vue'
  import { useCaseListStore } from '@/features/cm/store/caseListStore.ts'
  import { useSearchQueryStore} from '@/features/cm/store/searchQueryStore.ts'
  import { useCaseListSearch } from '@/features/cm/hooks/useCaseListSearch.ts'

  const caseListStore = useCaseListStore()

  const searchQueryStore = useSearchQueryStore()
  const { handleSearch,loading } = useCaseListSearch()

  onMounted(() => {
    handleSearch()
  })




</script>

<style scoped lang="scss">
  @use 'styles';
</style>
