<script setup lang="ts">
import {formatDate} from '@/libs/utils/formatDate.ts'
import {useReportInfo} from '@/features/dd/hooks/useReportInfo.ts'
import {useUpdateCase} from '@/features/dd/hooks/useUpdateCase.ts'
import {diseaseMap} from '@/features/dd/types';

const { reportInfo } = useReportInfo()
const {updateCaseQuery , handleUpdate} = useUpdateCase()
onMounted(()=>{
  updateCaseQuery.value.diseaseName = []
  updateCaseQuery.value.diseaseName.push(...reportInfo.value.diseaseTypes || "")
})
watch(()=>reportInfo.value,()=>{
  updateCaseQuery.value.diseaseName = []
  updateCaseQuery.value.diseaseName.push(...reportInfo.value.diseaseTypes || "")
})
</script>

<template>
  <div class="report-container">
    <div class="report-container__title">诊断报告</div>
    <div class="report-item">
      <div class="report-item__title">
        <span>基本信息</span>
      </div>
      <div class="report-item__content">
        <div class="report-item__line">
          <label>检查日期</label>
          <span>{{ formatDate(reportInfo.createDate) }}</span>
        </div>
        <div class="report-item__line">
          <label>检查医师</label>
          <span>{{ reportInfo.responsibleDoctor || '不详' }}</span>
        </div>
        <div class="report-item__line">
          <label>建议复诊时间</label>
          <span>{{ reportInfo.revisitTime || '不详' }}</span>
        </div>
      </div>
    </div>
    <div class="report-item history-diag">
      <div class="report-item__title">
        <span>历史诊断</span>
      </div>
      <div class="report-item__content history-diag__content">
        <div class="history-diag__item" v-for="item in reportInfo.historyDiags">
          <div class="doctor-name">
            <span>{{item.doctor}}</span>
          </div>
          <div class="ex-conclusion">
            {{item.diagnosis}}
          </div>
        </div>
      </div>
    </div>
    <div class="report-item conclusion">
      <div class="report-item__title">
        <span>诊断结论</span>
      </div>
      <div class="report-item__content">
        <el-input :rows="5" type="textarea" v-model="updateCaseQuery.normalDiag.docSuggestions" placeholder="请输入内容"></el-input>
        <el-select
          v-model="updateCaseQuery.diseaseName"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="请选择病症名称">
          <el-option v-for="item in diseaseMap" :key="item[0]" :label="item[1]" :value="item[1]" />
        </el-select>
      </div>
    </div>
    <div class="report-opt">
      <el-button class="report-opt__save" type="primary" @click="handleUpdate">
        保存
      </el-button>
      <el-button class="report-opt__export" type="info">导出PDF</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>