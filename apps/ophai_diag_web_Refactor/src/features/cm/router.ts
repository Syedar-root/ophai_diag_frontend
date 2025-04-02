import {type RouteRecordRaw} from 'vue-router'

export default [
  {
    path: '/cm',
    name: 'CaseManagement',
    component: () => import('./index.vue'),
    meta: {
      title: '病例库',
      navOrder: 4
    }
  },
] as RouteRecordRaw[]

