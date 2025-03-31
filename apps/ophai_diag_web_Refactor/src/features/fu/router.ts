import {type RouteRecordRaw} from 'vue-router'

export const fuRoutes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    redirect: '/fu'
  },
  {
    path: 'fu',
    name: 'FastUpload',
    component: () => import('./index.vue')
  },
]

