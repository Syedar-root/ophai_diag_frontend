<script setup lang="ts">
import VChart from "vue-echarts";
import "echarts";
import { usePieChart } from "./hooks/usePieChart.ts";
import { useMoveBarChart } from "@/features/dashboard/hooks/useMoveBarChart.ts";
import {computed, ref} from 'vue';
import {useMapChartData} from "@/features/dashboard/hooks/useMapChartData.ts";

let diseaseTypes = ['AMD', '糖尿病', '高血压', '青光眼', '近视','白内障','其他疾病'];

const genderPieChartOptions = computed(()=>{
  let arr = [] as any[];
  for (let i = 0; i < diseaseTypes.length; i++) {
    arr.push(usePieChart(genderPieChartData.value.get(diseaseTypes[i]),`${diseaseTypes[i]}性别分布`));
  }
  return arr;
});
const agePieChartOptions = computed(()=>{
  let arr = [] as any[];
  for (let i = 0; i < diseaseTypes.length; i++) {
    arr.push(usePieChart(agePieChartData.value.get(diseaseTypes[i]),`${diseaseTypes[i]}年龄分布`));
  }
  return arr;
})
const moveBarChartOptions = computed(()=>{
  return useMoveBarChart();
})




const {agePieChartData,genderPieChartData,initMapChartData } = useMapChartData();

onMounted(async ()=>{
  await initMapChartData();
})

</script>

<template>
  <div class="board-container">
    <div class="board-container__left left-content" ref="leftContentRef">
      <el-scrollbar>
        <div class="left-content__main">
          <div class="pieChart" v-for="item in genderPieChartOptions" >
            <v-chart :option="item" autoresize></v-chart>
          </div>
          <div class="pieChart" v-for="item in agePieChartOptions">
            <v-chart :option="item" autoresize></v-chart>
          </div>
          <div class="pieChart">
            <v-chart :option="moveBarChartOptions.value" autoresize></v-chart>
          </div>
        </div>
      </el-scrollbar>

    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>