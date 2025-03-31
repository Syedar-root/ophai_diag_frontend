import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import {fuRoutes} from '@/features/fu/router.ts'
import {cmRoutes} from '@/features/cm/router.ts'
import {ddRoutes} from '@/features/dd/router.ts'

// 极简预加载逻辑
const preloadComponents = (to: any) => {
  to.matched.forEach((record: any) => {
    const component = record.components?.default;
    // 仅处理未加载的异步组件
    if (typeof component === 'function') {
      try {
        component(); // 触发组件加载
      } catch (error) {
        console.warn('预加载失败:', record.path, error);
      }
    }
  });
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/shared/layout/index.vue'),
    children: [
      ...fuRoutes,
      ...cmRoutes,
      ...ddRoutes,
    ],
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/shared/components/common/Loading/Loading.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, _, next) => {
  preloadComponents(to);
  next();
});

export default router
