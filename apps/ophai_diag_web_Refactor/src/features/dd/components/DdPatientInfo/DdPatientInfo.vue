<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import {formatDate} from '@/libs/utils/formatDate.ts';
import {usePatientInfo} from '@/features/dd/hooks/usePatientInfo.ts'

const { patientInfo } = usePatientInfo()

</script>

<template>
  <div class="patient-info-area">
    <span class="patient-info-area__title">患者信息</span>
    <div class="patient-info-area__content">
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
              <span>{{ patientInfo.gender || '性别不详' }}</span>
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
                <el-tag type="primary" v-for="diseaseType in item.diseaseTypes ">{{diseaseType || '不详'}}</el-tag>
              </span>
            </div>
            <el-icon>
              <ArrowRight></ArrowRight>
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>