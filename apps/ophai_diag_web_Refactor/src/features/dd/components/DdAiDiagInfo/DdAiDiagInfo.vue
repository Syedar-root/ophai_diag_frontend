<script setup lang="ts">

import VChart from 'vue-echarts'
import 'echarts'
import {useAiDiagInfo} from '@/features/dd/hooks/useAiDiagInfo.ts'
import { computed, ref } from 'vue'
import {diseaseMap} from '@/features/dd/types/index.ts'

const {aiDiagInfo} = useAiDiagInfo()
// 基础配置
const baseOptions = (data: any) => {
  return {
    xAxis: {
      type: 'category',
      data: Array.from(data.value.keys())
    },
    grid: {
      left: 'center',
      top: 'center',
      width: '50%',
      height: '50%'
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `${(value * 100).toFixed(1)}%` // 小数转百分比
      }
    },
    tooltip: {
      trigger: 'axis', // 改回item触发模式
      position: function (point:number[]) {
        return [point[0]-300, "10%"] // 调整位置，防止超出
      },
      formatter: function () {
        // 获取全部数据并排序
        const allData = Array.from<[string, number]>(data.value.entries()).sort((a, b) => b[1] - a[1])
        // let result = `<div style="margin-bottom: 5px; font-weight: bold; color: #666">完整疾病概率报告</div>`;
        let result = ''
        allData.forEach(([key, value]) => {
          const diseaseName = diseaseMap.get(key) ?? '未知疾病'
          result += `
          <div style="padding: 4px 0; line-height: 1.6;">${diseaseName + key}:
            <span style="float: right; margin-left: 25px; color: #333; font-weight: 500;">
              ${(value * 100).toFixed(4)}%
            </span>
          </div>`
        })
        return result
      },
      extraCssText: 'width: 280px;' // 固定宽度防止抖动
    },
    series: [
      {
        data: Array.from(data.value.values()),
        type: 'bar',
        itemStyle: {
          color: function (params: any) {
            // params.value 是当前柱子的 y 值
            if (params.value > 0.5) {
              return '#FF6B6B'
            } else {
              return '#4ECDC4'
            }
          }
        }
      }
    ]
  }
}

// 图表数据
const allOptions = computed(() => {
  const data = ref(aiDiagInfo.value.predictions)
  return baseOptions(data)
})

const partOptions = computed(() => {
  const data = ref(new Map(Array.from(aiDiagInfo.value.predictions.entries()).filter(([_, value]) => value <= 0.05)))
  return baseOptions(data)
})
</script>

<template>
  <div class="ai-diag-area">
        <span class="ai-diag-area__title">
          <span>AI诊断</span>
          <span>各疾病患病概率</span>
        </span>
    <div class="ai-diag-area__content">
      <div class="diag">
        <div class="finding diag-content">
          <span class="diag-content__title">主要发现</span>
          <div class="diag-content__find-item" v-for="(item, index) in aiDiagInfo.suggestions" :key="index">
            <div class="point"></div>
            <div class="info">{{ item }}</div>
          </div>
        </div>
        <div class="finding diag-content">
          <span class="diag-content__title">建议用药</span>
          <div class="diag-content__find-item" v-for="(item, index) in aiDiagInfo.drugs" :key="index">
            <div class="func-info info">{{ item.function + '：' }}</div>
            <div class="info">{{ item.drug.toString().split(',').join('，') }}</div>
          </div>
        </div>
      </div>
      <div class="chart">
        <div class="chart-content">
          <v-chart :option="allOptions" autoresize></v-chart>
        </div>
        <div class="chart-content">
          <v-chart :option="partOptions" autoresize></v-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>