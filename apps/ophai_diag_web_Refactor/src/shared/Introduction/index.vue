<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import lottieData from './Animation.json'  // 修改导入方式
</script>

<template>
  <DotLottieVue
    style="height: 500px; width: 500px"
    autoplay
    loop
    :data="lottieData"
  />
</template>

<style scoped lang="scss">

</style>