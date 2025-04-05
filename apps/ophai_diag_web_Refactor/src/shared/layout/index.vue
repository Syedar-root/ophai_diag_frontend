<template>
  <div class="layout-container">
    <div class="layout__header">
      <Nav></Nav>
    </div>
    <div class="layout__main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  <Login v-if="tokenStore.showLogin"></Login>
</template>
<script setup lang="ts">
  import Nav from '@/shared/components/business/nav/index.vue'
  import Login from "@/shared/components/business/login/index.vue";
  import {useTokenStore} from '@/libs/store/token';
  const tokenStore = useTokenStore();

  watch(
      () => tokenStore.token,
      (newVal:string) => {
        if (newVal === null || newVal === '' || newVal === undefined) {
          tokenStore.toggleLogin(true)
        }else {
          tokenStore.toggleLogin(false)
        }
      },{immediate:true}
  )
</script>

<style scoped lang="scss">
  $headerHeight: clamp(64px, 5vh, 104px);
  .layout-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .layout__header {
    position: relative;
    width: 100%;
    height: $headerHeight;
    min-height: 64px;
    border-bottom: 1px solid #ccc;
  }

  .layout__main {
    position: relative;
    width: 100%;
    height: calc(100vh - $headerHeight);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
