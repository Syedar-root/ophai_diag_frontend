import type { RouteRecordRaw } from 'vue-router'
export default [
  {
    path: '/dd/:id?',
    name: 'DiseaseDiagnosis',
    component: () => import('./index.vue'),
    props: true,
    meta: {
      title: '诊断分析',
      navOrder: 2
    }
  }
] as RouteRecordRaw[]