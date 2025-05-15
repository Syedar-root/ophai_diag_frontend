import {type RouteRecordRaw} from 'vue-router'
import {Permission} from "@/shared/components/business/login/types.ts";

export default[
  {
	path: '/dashboard',
	name: 'dashboard',
	component: () => import('./view.vue'),
	meta: {
	  title: '数据看板',
	  navOrder: 0,
	  permission: [Permission.SCIENTIST, Permission.DOCTOR, Permission.ADMIN] as Permission[]
	}
  },
] as RouteRecordRaw[]

