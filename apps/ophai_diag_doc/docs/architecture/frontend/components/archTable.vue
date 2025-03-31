<script setup>
const data = [
  {
    state: '原型期',
    mode: 'MVC架构',
    shortcoming: [
      '组件耦合 78%；复用率＜20%；',
    ],
    solution: [
      '拆分为 3 模块；Vue3 组合式 API 解耦；TS 类型（35%）',
    ],
  },
  {
    state: '重构期',
    mode: '模块化架构',
    shortcoming: [
      '跨模块通信链长 4.2；TS 覆盖率 65%；工具重复 41%',
    ],
    solution: [
      'TS 覆盖率 100%；建 libs 共享层；Eslint 代码规范 + Vitest 单元测试',
    ],
  },
  {
    state: '工程化期',
    mode: 'Monorepo',
    shortcoming: [
      '全量构建 8.2min；依赖重复 23%；配置不一致 68%',
    ],
    solution: [
      'pnpm workspace 管理；抽象基础配置；独立 CLI；微前端准备理',
    ],
  }
]
</script>

<template>
  <el-table :data="data" border>
    <el-table-column prop="state" label="阶段"></el-table-column>
    <el-table-column prop="mode" label="架构模式">
    </el-table-column>
    <el-table-column prop="shortcoming" label="痛点">
      <template #default="{row}">
        <ul>
          <li v-for="item in row.shortcoming" :key="item">{{item}}</li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column prop="solution" label="解决方案">
      <template #default="{row}">
        <ul>
          <li v-for="item in row.solution" :key="item">{{item}}</li>
        </ul>
      </template>
    </el-table-column>
  </el-table>

</template>

<style lang="scss">
.vp-doc table:not(:where(.vp-raw, .vp-raw *)) {
  border-collapse: initial;
  margin: 0 auto;
  display: table;
}
</style>