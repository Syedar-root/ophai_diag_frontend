import {type RouteRecordRaw} from 'vue-router'
import {Permission} from "@/shared/components/business/login/types.ts";

export default[
  {
	path: '/scienceDashboard',
	name: 'ScienceDashboard',
	component: () => import('./view.vue'),
	meta: {
	  title: '研究看板',
	  navOrder: 0,
	  permission: [Permission.SCIENTIST, Permission.ADMIN] as Permission[]
	}
  },
] as RouteRecordRaw[]

