<script setup lang="ts">
import  {useSearchPatientQueryStore} from "@/features/pm/store/searchPatientQueryStore.ts";
import { usePatientListStore } from "@/features/pm/store/patientListStore.ts";
import {usePatientListSearch} from "@/features/pm/hooks/usePatientListSearch.ts";

const searchPatientQueryStore = useSearchPatientQueryStore();
const patientListStore = usePatientListStore();
const {handleSearch} = usePatientListSearch();

</script>

<template>
<div class="pm-pagination">
  <el-pagination
      v-model:current-page="searchPatientQueryStore.searchPatientQuery.pageNum"
      background
      layout="total,prev,pager,next"
      :total="patientListStore.patientList?.total"
      @click="handleSearch(true)" />
</div>
</template>

<style scoped lang="scss">
.pm-pagination{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>