import {type RouteRecordRaw} from 'vue-router'
import {Permission} from "@/shared/components/business/login/types.ts";

export default[
  {
	path: '/imageLibrary',
	name: 'ImageLibrary',
	component: () => import('./index.vue'),
	meta: {
	  title: '影像库',
	  navOrder: 3,
	  permission: [Permission.SCIENTIST, Permission.ADMIN] as Permission[]
	}
  },
] as RouteRecordRaw[]

