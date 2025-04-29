<script setup lang="ts">
import PmSearch from "@/features/pm/component/PmSearch/PmSearch.vue";
import PmTable from "@/features/pm/component/PmTable/PmTable.vue";
import PmPagination from "./component/PmPagination/PmPagination.vue";
import {usePatientListSearch} from "@/features/pm/hooks/usePatientListSearch.ts";

const {loading,handleSearch} = usePatientListSearch()
onMounted(()=>{
  handleSearch()
})
</script>

<template>
<div class="pm-container" v-loading="loading">
  <div class="pm-container__header">
    <PmSearch/>
  </div>
  <div class="pm-container__main">
    <PmTable/>
  </div>
  <div class="pm-container__footer">
    <PmPagination/>
  </div>
</div>
</template>

<style scoped lang="scss">
@use "@/shared/assets/styles/vars" as vars;
@use 'sass:map';
.pm-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: map.get(vars.$space, xxxxl);
  background-color: #fff;

  &__header{
    position: relative;
    width: 100%;
    height: clamp(200px,10%,250px);
  }
  &__main{
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__footer{
    position: relative;
    width: 100%;
    height: clamp(100px,10%,150px);
  }
}
</style>