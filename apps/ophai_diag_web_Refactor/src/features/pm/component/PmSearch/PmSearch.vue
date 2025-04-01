<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {usePatientListSearch} from "@/features/pm/hooks/usePatientListSearch.ts";

const {searchQuery, handleSearch} = usePatientListSearch()
</script>

<template>
<div class="pm-search">
  <div class="pm-search__input">
    <el-input
        :prefix-icon="Search"
        v-model="searchQuery.name"
        placeholder="请输入患者姓名"
        clearable>
      <template #append>
        <button @click="handleSearch()">搜索</button>
      </template>
    </el-input>
  </div>
  <div class="pm-search__select">
    <el-select></el-select>
    <el-button type="primary"></el-button>
  </div>
</div>
</template>

<style scoped lang="scss">
@use "styles";
</style>