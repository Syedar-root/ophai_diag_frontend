<script setup lang="ts">
import {useSearchNonAdminList} from "@/features/ac/hooks/useSearchNonAdminList.ts";
import NonAdminTable from './components/NonAdminTable/index.vue'
import NonAdminPagination from './components/NonAdminPagination/index.vue'
const { handleSearchNonAdminList } = useSearchNonAdminList()
onMounted(()=>{
  handleSearchNonAdminList()
})
</script>

<template>
  <div class="ac-container">
    <NonAdminTable />
    <NonAdminPagination/>
  </div>
</template>

<style scoped lang="scss">
  @use 'sass:map';
  @use '@/shared/assets/styles/vars' as vars;
  .ac-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: map.get(vars.$space, 'xxl');
    gap: map.get(vars.$space, 'm');
    background-color: map.get(vars.$colors, _white);
  }
</style>