import {type RouteRecordRaw} from 'vue-router'

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
      navOrder: 1
    }
  },
] as RouteRecordRaw[]

