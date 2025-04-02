import {type RouteRecordRaw} from 'vue-router'

export default[
  {
	path: '/pm',
	name: 'PatientManagement',
	component: () => import('./index.vue'),
	meta: {
	  title: '患者管理',
	  navOrder: 3
	}
  },
] as RouteRecordRaw[]

