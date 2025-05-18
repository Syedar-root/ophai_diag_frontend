import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useGetUserPermission } from '@/libs/hooks/useGetUserPermission.ts'
import { Permission } from '@/shared/components/business/login/types.ts'

const moduleRoutes = import.meta.glob('@/features/**/router.ts', { eager: true, import: 'default' })
const childRoutes = Object.entries(moduleRoutes)
  .filter(([_, value]) => value !== undefined)
  .map(([_, value]) => {
    return value as RouteRecordRaw[]
  })
  .flat()
  .sort((a, b) => {
    let aOrder = a.meta?.navOrder as number
    let bOrder = b.meta?.navOrder as number
    return aOrder > bOrder ? 1 : -1
  }) as RouteRecordRaw[]

// 极简预加载逻辑
const preloadComponents = (to: any) => {
  to.matched.forEach((record: any) => {
    const component = record.components?.default
    // 仅处理未加载的异步组件
    if (typeof component === 'function') {
      try {
        component() // 触发组件加载
      } catch (error) {
        console.warn('预加载失败:', record.path, error)
      }
    }
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/introduction'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/shared/layout/index.vue'),
    redirect: childRoutes[0].path,
    children: [...childRoutes]
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: () => import('@/shared/Introduction/index.vue'),
    meta: {
      permission: [Permission.PATIENT, Permission.SCIENTIST, Permission.DOCTOR, Permission.ADMIN] as Permission[]
    }
  },
  {
    path: '/imageMark',
    name: 'ImageMark',
    component: () => import('@/features/imageMark/index.vue'),
    meta: {
      permission: [Permission.SCIENTIST, Permission.DOCTOR, Permission.ADMIN] as Permission[]
    }
  },
  {
    path: '/3d',
    name: '3d',
    component: () => import('@/features/3d/index.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/shared/Introduction/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  preloadComponents(to)
  if (to.meta?.permission !== undefined) {
    let permission = useGetUserPermission()
    if ((to.meta.permission as Permission[]).includes(permission)) {
      next();
    }else if (to.path === '/dashboard' && permission === Permission.SCIENTIST) {
      next({
        path:'/scienceDashboard'
      })
    }
    else {
      alert('无权访问此页面')
      next({ path: '/introduction' })
    }
  }else {
    next()
  }
})

export default router
