<script setup lang="ts">
  import { CirclePlus, Search } from '@element-plus/icons-vue'
  import {useCaseListSearch} from '@/features/cm/hooks/useCaseListSearch.ts'
  import {useSearchQueryStore} from '@/features/cm/store/searchQueryStore.ts'
  import {useRouter} from 'vue-router'
  import { diagStatus, diseaseType} from '@/features/cm/types'

  const searchQueryStore = useSearchQueryStore()
  const {diseaseNameList,handleSearch} = useCaseListSearch()
  const router = useRouter()
  function handleAddCase() {
    router.push('/fu');
  }
</script>

<template>
  <div class="cm-header">
    <el-row class="cm-header__input-row" :gutter="4">
      <el-col :span="21">
        <el-input
          v-model="searchQueryStore.searchQuery.patientInfoPatientId"
          placeholder="请输入要查询患者ID"
          :prefix-icon="Search"
          clearable
          @keyup.enter="handleSearch"
          @blur="handleSearch" />
      </el-col>
      <el-col :span="3">
        <el-button @click="handleAddCase" type="primary" :icon="CirclePlus">新增病例</el-button>
      </el-col>
    </el-row>
    <el-row class="cm-header__select-row" :gutter="10">
      <el-col :span="4">
        <div class="select-area">
          <label>疾病分类</label>
          <el-select v-model="diseaseNameList"
                     multiple
                     filterable
                     allow-create
                     default-first-option
                     :reserve-keyword="false"
                     placeholder="请选择要查询的内容"
                     clearable
                     @blur="handleSearch">
            <el-option
              v-for="item in diseaseType"
              :key="item.value"
              :label="item.label"
              :value="item.label"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="select-area">
          <label>诊断状态</label>
          <el-select v-model="searchQueryStore.searchQuery.diagStatus" placeholder="请选择要查询的内容" clearable @blur="handleSearch">
            <el-option
              v-for="item in diagStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>