<script setup lang="ts">
  // 新增路由导入
  import { useRoute, useRouter} from 'vue-router'
  import { Document } from '@element-plus/icons-vue'
  // import SvgIcon from '@/shared/components/common/svgIcon/index.vue'
  // import GithubIcon from '@/shared/assets/icons/github.svg'
  import {computed} from "vue";
  import {useUserStore} from "@/libs/store/user";
  import {useTokenStore} from "@/libs/store/token";
  import {useGetUserPermission} from "@/libs/hooks/useGetUserPermission.ts";
  import { Permission } from "@/shared/components/business/login/types.ts";

  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const tokenStore = useTokenStore()

  const navRoutes = computed(() => {
    return router.getRoutes().find(route=>route.path === '/index')?.children.filter(item=> item.meta?.navOrder != -1).sort((a,b)=>{
      let aOrder = a.meta?.navOrder as number;
      let bOrder = b?.meta?.navOrder as number;
      return aOrder > bOrder ? 1 : -1;
    }).filter(item => (item.meta?.permission as Permission[]).includes( useGetUserPermission() as Permission))
  })

  onMounted(() => {
    // console.log(route.path)
    // console.log(navRoutes.value)
  })

  function handleLoginOut() {
    tokenStore.removeToken()
    userStore.removeUser()
    // console.log(tokenStore.token)
  }

  function getPosition(){
    let permission = useGetUserPermission() as Permission;
    if(permission === Permission.DOCTOR){
      return "主任医师"
    }else if(permission === Permission.SCIENTIST){
      return "数据研究员"
    }else if(permission === Permission.ADMIN){
      return "管理员"
    }
  }

  const toDocs = () => {
    window.open(import.meta.env.VITE_DOCS_URL, '_blank')
  }
</script>

<template>
  <div class="nav-container">
    <div class="nav__logo-area" @click="router.push('/introduction')">
      <img class="nav-logo" src="../../../assets/logo/logo.svg?url" alt="logo" loading="lazy" />
    </div>
    <div class="nav__tab-area">
      <div
          v-for="item in navRoutes"
          :key="item.path"
          class="tab-item"
          :class="{
          active: route.path === item.path || route.path.startsWith(`${item.path.slice(0,3)}`)
        }"
          @click="router.push(item.path)">
        <span>{{ item.meta?.title || item.name }}</span>
      </div>
    </div>
    <div class="nav__user-area">
      <div class="icon-item" @click="toDocs">
        <el-icon><Document /></el-icon>
      </div>
<!--      <div class="icon-item">-->
<!--        <SvgIcon :icon="GithubIcon" />-->
<!--      </div>-->
      <el-dropdown>
        <div class="user-item">
          <div class="user-item__info">
            <div class="user-item__info__name">{{userStore.user.userName || "王德民"}} {{getPosition()}}</div>
            <div class="user-item__info__department">{{userStore.user.hospital || "眼科中心"}}</div>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button type="danger" @click="handleLoginOut">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>

<style scoped lang="scss">
  @use 'styles';
</style>
