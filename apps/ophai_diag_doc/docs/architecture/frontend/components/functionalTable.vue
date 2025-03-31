<script setup>
import 'element-plus/dist/index.css'
const data = [
  {
    module:'病例管理（CM）',
    function:["多条件复合搜索","分页表格渲染", "病例状态追踪"],
    highlight:["搜索条件与表格状态分离式设计（`searchQueryStore`）","虚拟滚动优化（`vue-virtual-scroller`）"]
  },
  {
    module:'诊断详情（DD）',
    function:["影像基础操作","AI报告联动"],
    highlight:[""]
  },
  {
    module: "快速上传（FU）",
    function: ["影像上传","影像批量上传","自动生成病例"],
    highlight:["",]
  }
]
</script>

<template>
  <el-table :data="data" border>
    <el-table-column prop="module" label="模块"></el-table-column>
    <el-table-column prop="function" label="功能要点">
      <template #default="{row}">
        <ul>
          <li v-for="item in row.function" :key="item">{{item}}</li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column prop="highlight" label="技术亮点">
      <template #default="{row}">
        <ul>
          <li v-for="item in row.highlight" :key="item">{{item}}</li>
        </ul>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>

.vp-doc table:not(:where(.vp-raw, .vp-raw *)) {
  border-collapse: initial;
  margin: 0 auto;
  display: table;
}
</style>