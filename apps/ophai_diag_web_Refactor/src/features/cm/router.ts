import {type RouteRecordRaw} from 'vue-router'

export const cmRoutes: RouteRecordRaw[] = [
  {
    path: 'cm',
    name: 'CaseManagement',
    component: () => import('./index.vue')
  },
]

