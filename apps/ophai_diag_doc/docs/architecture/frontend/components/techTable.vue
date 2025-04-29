<script setup>
const tableData = [
  {
    tech: 'Vue',
    advantage: [
      'Vue 具备动态组件功能。',
      '可实现高效的组件更新，极大地提升了应用的性能和响应速度。'
    ],
    compared: [
      '相较于 React，React 的 Context API 用于处理复杂状态共享。',
      '其配置和使用过程较为繁琐。'
    ]
  },
  {
    tech: 'Vite',
    advantage: [
      'Vite 在大型项目中表现出色。',
      '能够实现极速的热模块替换（HMR），显著缩短开发过程中的等待时间。'
    ],
    compared: [
      '与 webpack 相比，webpack 用于构建大型项目。',
      '由于其复杂的打包流程，构建速度相对缓慢。'
    ]
  },
  {
    tech: 'TypeScript',
    advantage: [
      'TypeScript 提供了静态类型检查功能。',
      '在编译阶段就能发现潜在的类型错误，提高了代码的健壮性和可维护性。'
    ],
    compared: [
      'JavaScript 是动态类型语言。',
      '在运行时才能发现类型相关的问题，这增加了调试的难度和成本。'
    ]
  },
  {
    tech: 'Pinia',
    advantage: [
      'Pinia 作为 Vue 的状态管理库，其设计简洁易用。',
      '减少了样板代码，使状态管理更加直观和高效。'
    ],
    compared: [
      'Vuex 在模块注册时存在冗余复杂的问题。',
      '增加了开发者的学习成本和代码的维护难度。'
    ]
  },
  {
    tech: 'ESLint',
    advantage: [
      'ESLint 提供强大的静态代码分析能力。',
      '支持高度自定义规则配置，可自动修复常见代码问题。',
      '与主流编辑器深度集成，支持实时错误检测。'
    ],
    compared: [
      '相较于 JSHint，ESLint 的插件体系更为完善。',
      'TSLint 已停止维护，ESLint 已成为 TypeScript 官方推荐方案。',
      'Stylelint 专注于样式规范，ESLint 专注于 JavaScript/TypeScript 质量管控。'
    ]
  }
];
</script>

<template>
  <el-table :data="tableData" border>
    <el-table-column prop="tech" label="技术" width="180" />
    <el-table-column prop="advantage" label="优势" width="300" >
      <template #default="{row}">
        <ul>
          <li v-for="(item, index) in row.advantage" :key="index">
            {{ item }}
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column prop="compared" label="相比" width="300" >
      <template #default="{row}">
        <ul>
          <li v-for="(item, index) in row.compared" :key="index">
            {{ item }}
          </li>
        </ul>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>