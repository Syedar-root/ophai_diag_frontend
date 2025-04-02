<script setup lang="ts">
import { useTransition } from "@vueuse/core"
import { ref } from 'vue';
import SvgIcon from '@/shared/components/common/svgIcon/index.vue'
import PatientIcon from '@/shared/assets/icons/patient.svg';
import UndiagnosedIcon from '@/shared/assets/icons/undiagnosed.svg';
import DiagnosedIcon from '@/shared/assets/icons/diagnosed.svg';
const patientsPerDay = ref(0);
const undiagnosed = ref(0);
const diagnosed = ref(0);
const statisticPatientsPerDay = useTransition(patientsPerDay,{duration: 1500});
const statisticUndiagnosed = useTransition(undiagnosed,{duration: 1500});
const statisticDiagnosed = useTransition(diagnosed,{duration: 1500});
patientsPerDay.value = 20434;
undiagnosed.value = 2948;
diagnosed.value = 948;
</script>

<template>
<div class="count-container">
  <div class="count-container__item">
    <SvgIcon class="count-container__item-icon" :icon="PatientIcon" :color="`#3ea2e4`" :size="30"></SvgIcon>
    <el-statistic title="今日患者数" :value="statisticPatientsPerDay"></el-statistic>
  </div>
  <div class="count-container__item">
    <SvgIcon class="count-container__item-icon" :icon="UndiagnosedIcon" :color="`#787878`" :size="30"></SvgIcon>
    <el-statistic title="待诊断" :value="statisticUndiagnosed"></el-statistic>
  </div>
  <div class="count-container__item">
    <SvgIcon class="count-container__item-icon" :icon="DiagnosedIcon" :color="`#43cd88`" :size="30"></SvgIcon>
    <el-statistic title="已诊断" :value="statisticDiagnosed"></el-statistic>
  </div>
</div>
</template>

<style scoped lang="scss">
@use"sass:map";
@use"@/shared/assets/styles/vars.scss" as vars;
.count-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  &__item{
    position: relative;
    width: 10%;
    .el-statistic{
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-between;
      gap: map.get(vars.$space,m);
      --el-statistic-title-font-size: #{map.get(vars.$font-size,s)};
      --el-statistic-content-font-size: #{map.get(vars.$font-size, xxl)};
    }
  }
  &__item-icon{
    position: absolute;
    right: 0;
  }
}
</style>