<script setup lang="ts">
import { onMounted,watch } from 'vue'
import Login from '@/shared/components/business/login/index.vue'
import {useTokenStore} from '@/libs/store/token';
const tokenStore = useTokenStore();

onMounted(() => {
  console.log(tokenStore.token);
  performance.mark('vue-app-mounted');
  let app = document.getElementById('app')
  if (!app) return
  app.style.maxWidth = '100vw'
  app.style.width = '100vw'
  app.style.height = '100vh'
  app.style.padding = '0'
  app.style.marginLeft = '0'
  app.style.marginRight = '0'
  app.style.overflow = 'hidden'
  app.style.position = 'absolute'
})

watch(
    () => tokenStore.token,
    (newVal:string) => {
      if (newVal === null || newVal === '' || newVal === undefined) {
        tokenStore.toggleLogin(true)
      }
    }
)
</script>

<template>
  <router-view></router-view>
  <Login v-if="tokenStore.showLogin"></Login>
</template>

<style scoped></style>