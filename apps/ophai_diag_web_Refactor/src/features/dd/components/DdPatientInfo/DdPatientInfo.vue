<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import {usePatientInfo} from '@/features/dd/hooks/usePatientInfo.ts'

const { patientInfo } = usePatientInfo()


const emptyText = ref('加载失败，请稍后重试')
const empty = ref(false)

function formatDate(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString().split('/').join('-')
}

watch(
  () => patientInfo.value,
  (newVal) => {
    if (newVal === null) {
      empty.value = true
    }
  }
)
</script>

<template>
  <div class="patient-info-area">
    <span class="patient-info-area__title">患者信息</span>
    <div class="patient-info-area__content" v-if="!empty && patientInfo">
      <div class="patient-base-info">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="patient-base-info__item">
              <label>患者ID</label>
              <span>{{ patientInfo.id }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="patient-base-info__item">
              <label>姓名</label>
              <span>{{ patientInfo.name || '姓名不详' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="patient-base-info__item">
              <label>年龄</label>
              <span>{{ patientInfo.age || '年龄不详' }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="patient-base-info__item">
              <label>性别</label>
              <span v-if="patientInfo.gender === 0 ">男</span>
              <span v-else-if="patientInfo.gender === 1 ">女</span>
              <span v-else>性别不详</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="patient-history-case">
        <span class="patient-history-case__title">历史病例</span>
        <div class="patient-history-case__content">
          <div
            v-for="item in patientInfo.historyCases"
            class="patient-history-case__item"
            :key="item.caseId"
            v-route="`/dd/${item.caseId}`">
            <div class="point"></div>
            <div class="info">
              <span class="date">{{ formatDate(item.createDate) }}</span>
              <span class="description">
                <el-tag type="primary" v-for="diseaseType in item.diseaseTypes ">{{ diseaseType }}</el-tag>
              </span>
            </div>
            <el-icon>
              <ArrowRight></ArrowRight>
            </el-icon>
          </div>
        </div>
      </div>
    </div>
    <el-empty v-if="empty" :description="emptyText"></el-empty>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>