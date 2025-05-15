import {type RouteRecordRaw} from 'vue-router'
import {Permission} from "@/shared/components/business/login/types.ts";

export default [
  {
    path: '/cm',
    name: 'CaseManagement',
    component: () => import('./index.vue'),
    meta: {
      title: '病例库',
      navOrder: 4,
      permission: [Permission.SCIENTIST, Permission.DOCTOR, Permission.ADMIN] as Permission[]
    }
  },
] as RouteRecordRaw[]

