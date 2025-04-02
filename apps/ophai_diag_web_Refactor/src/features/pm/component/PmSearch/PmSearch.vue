<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {usePatientListSearch} from "@/features/pm/hooks/usePatientListSearch.ts";
import {diseaseType} from "@/features/pm/types";
import {useSearchPatientQueryStore} from "@/features/pm/store/searchPatientQueryStore.ts";
const searchPatientQueryStore = useSearchPatientQueryStore();
const {diseaseNameList, handleSearch} = usePatientListSearch()

onMounted(() => {
  handleSearch();
})
</script>

<template>
<div class="pm-search">
  <div class="pm-search__input">
    <el-input
        :prefix-icon="Search"
        v-model="searchPatientQueryStore.searchPatientQuery.target"
        placeholder="请输入患者姓名"
        @keyup.enter.native="handleSearch()"
        clearable>
    </el-input>
    <el-button type="primary" @click="handleSearch()">搜索</el-button>
  </div>
<!--  <div class="pm-search__select">-->
<!--    <label>疾病分类</label>-->
<!--    <el-select-->
<!--        v-model="diseaseNameList"-->
<!--        multiple-->
<!--        filterable-->
<!--        allow-create-->
<!--        default-first-option-->
<!--        :reserve-keyword="false"-->
<!--        placeholder="请选择要查询的内容"-->
<!--        clearable-->
<!--        @blur="handleSearch">-->
<!--      <el-option-->
<!--          v-for="item in diseaseType"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.label"></el-option>-->
<!--    </el-select>-->
<!--  </div>-->
</div>
</template>

<style scoped lang="scss">
@use "styles";
</style>