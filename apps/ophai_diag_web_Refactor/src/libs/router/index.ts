import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'


const moduleRoutes = import.meta.glob('@/features/**/router.ts',{eager: true, import: 'default'})
const childRoutes = Object.entries(moduleRoutes).map(([_, value]) => {
  return value as RouteRecordRaw[];
}).flat().sort((a , b)=>{
  let aOrder = a.meta?.navOrder as number;
  let bOrder = b.meta?.navOrder as number;
  return aOrder > bOrder ? 1 : -1;
}) as RouteRecordRaw[];


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
    redirect: childRoutes[0].path,
    children: [
      ...childRoutes,
    ],
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/shared/Introduction/index.vue')
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
