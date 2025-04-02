import {type RouteRecordRaw} from 'vue-router'

export default[
  {
	path: '/dashboard',
	name: 'dashboard',
	component: () => import('./view.vue'),
	meta: {
	  title: '数据看板',
	  navOrder: 0
	}
  },
] as RouteRecordRaw[]

