<script setup lang="ts">
  import { Delete, View } from '@element-plus/icons-vue'
  import {useCaseListStore} from '@/features/cm/store/caseListStore.ts'
  import {diagStatus,gender} from '@/features/cm/types'
  import {formatDate} from '@/libs/utils/formatDate.ts'
  import {useRouter} from 'vue-router'

  const caseListStore = useCaseListStore()
  const router = useRouter()

  function handleViewCase(index: number | string) {
    router.push(`/dd/${index}`)
  }
</script>

<template>
  <div class="cm-main">
    <el-table :data="caseListStore.caseList.items" header-row-class-name="tb-header-row-style" :row-style="{minHeight: '80px'}">
      <el-table-column prop="caseId" label="病例ID" width="200"></el-table-column>
      <el-table-column prop="patientId" label="患者ID" width="200"></el-table-column>
      <el-table-column prop="patientName" label="患者姓名" width="auto"></el-table-column>
      <el-table-column prop="age" label="年龄" width="auto"></el-table-column>
      <el-table-column prop="gender" label="性别" width="auto">
        <template #default="scope">
          {{ gender.find(item => item.value === scope.row.gender)?.label || '未知状态' }}
        </template>
      </el-table-column>
      <el-table-column prop="diseaseType" label="疾病类型" width="auto">
        <template #default="scope">
          <div style="display: flex;justify-content: start;gap: 5px;flex-wrap: wrap">
            <el-tag v-for="item in caseListStore.caseList.items[scope.$index].diseaseType" type="primary">{{item}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="diagStatus" label="诊断状态" width="auto">
        <template #default="scope">
          {{ diagStatus.find(item => item.value === scope.row.diagStatus)?.label || '未知状态' }}
        </template>
      </el-table-column>
      <el-table-column prop="responsibleDoctor" label="责任医师" width="auto"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="auto">
        <template #default="scope">
          {{ formatDate(caseListStore.caseList.items[scope.$index].createDate, true) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新时间" width="auto">
        <template #default="scope">
          {{ formatDate(caseListStore.caseList.items[scope.$index].updateDate, true) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="auto">
        <template #default="scope">
          <div class="table-opt">
            <el-icon @click="handleViewCase(caseListStore.caseList.items[scope.$index]?.caseId)">
              <View></View>
            </el-icon>
<!--            <el-icon><Delete></Delete></el-icon>-->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>