import type { RouteRecordRaw } from 'vue-router'
import { Permission } from '@/shared/components/business/login/types.ts'

export default [
  {
    path: '/dd/:id?',
    name: 'DiseaseDiagnosis',
    component: () => import('./index.vue'),
    props: true,
    meta: {
      title: '诊断分析',
      navOrder: 2,
      permission: [Permission.PATIENT, Permission.SCIENTIST, Permission.DOCTOR, Permission.ADMIN] as Permission[]
    }
  }
] as RouteRecordRaw[]