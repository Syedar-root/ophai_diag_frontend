<script setup lang="ts">
import VChart from "vue-echarts";
import "echarts";
import { usePieChart } from "./hooks/usePieChart.ts";
import { useLineChart } from "./hooks/useLineChart.ts";
import count from "./component/count.vue"
import {ref} from 'vue';
import {Delete} from "@element-plus/icons-vue";

const pieChartOptions = usePieChart();
const lineChartOptions = useLineChart();
const input = ref<string>('');
const list = ref<string[]>([]);
function handleAddList(){
  if(!input.value) return;
  list.value.splice(0,0,input.value);
  input.value = '';
}
function handleRemoveList(index: number){
  list.value.splice(index,1);
}

</script>

<template>
  <div class="board-container">
    <div class="board-container__left left-content" ref="leftContentRef">
      <div class="left-content__header">
        <count></count>
      </div>
      <div class="left-content__main">
        <div class=" left-content__main-left">
          <v-chart :option="lineChartOptions" autoresize></v-chart>
        </div>
        <div class=" left-content__main-right">
          <v-chart :option="pieChartOptions" autoresize></v-chart>
          <v-chart :option="pieChartOptions" autoresize></v-chart>
        </div>
      </div>
    </div>
    <div class="board-container__right right-content">
      <el-calendar class="calendar" />
      <div class="plan">
        <el-input placeholder="输入后回车可创建待办" v-model="input" @keyup.enter.native="handleAddList"/>
        <transition-group name="list">
          <li class="plan-item" v-for="(item , index) in list"
              :key="item">
            {{ item }}
            <el-icon @click="handleRemoveList(index)">
              <Delete />
            </el-icon>
          </li>
        </transition-group>
      </div>
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