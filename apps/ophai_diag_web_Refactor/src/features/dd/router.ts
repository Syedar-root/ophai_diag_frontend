import type { RouteRecordRaw } from 'vue-router'
export const ddRoutes: RouteRecordRaw[] = [
  {
    path: '/dd/:id?',
    name: 'DiseaseDiagnosis',
    component: () => import('./index.vue'),
    props: true,
  }
]