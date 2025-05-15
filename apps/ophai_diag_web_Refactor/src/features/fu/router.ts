import {type RouteRecordRaw} from 'vue-router'
import {Permission} from "@/shared/components/business/login/types.ts";

export default [
  // {
  //   path: '/',
  //   name: 'Index',
  //   redirect: '/fu'
  // },
  {
    path: '/fu',
    name: 'FastUpload',
    component: () => import('./index.vue'),
    meta: {
      title: '快速上传',
      navOrder: 1,
      permission: [ Permission.DOCTOR, Permission.ADMIN] as Permission[]
    }
  },
] as RouteRecordRaw[]

