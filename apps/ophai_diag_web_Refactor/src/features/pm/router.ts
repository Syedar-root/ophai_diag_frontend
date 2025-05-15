import {type RouteRecordRaw} from 'vue-router'
import {Permission} from "@/shared/components/business/login/types.ts";

export default[
  {
	path: '/pm',
	name: 'PatientManagement',
	component: () => import('./index.vue'),
	meta: {
	  title: '患者管理',
	  navOrder: 3,
	  permission: [Permission.SCIENTIST, Permission.DOCTOR, Permission.ADMIN] as Permission[]
	}
  },
] as RouteRecordRaw[]

