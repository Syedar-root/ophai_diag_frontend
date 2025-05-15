import {type RouteRecordRaw} from 'vue-router'
import {Permission} from "@/shared/components/business/login/types.ts";

export default [
  {
	path: '/ac',
	name: 'AdminController',
	component: () => import('./index.vue'),
	meta: {
	  title: '用户管理',
	  navOrder: 5,
	  permission: [Permission.ADMIN] as Permission[]
	}
  },
] as RouteRecordRaw[]