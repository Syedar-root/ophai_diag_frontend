<script setup lang="ts">
 import { handleSearchImage } from './hooks/useSearchImage.ts'
 import ImageLibSearch from './components/ImageLibSearch/index.vue'
 import ImageLibList from './components/ImageLibList/index.vue'
 import ImageLibPagination from './components/ImageLibPagination/index.vue'
 onMounted(()=>{
    handleSearchImage();
 })
</script>

<template>
  <div class="imageLib-container" >
    <ImageLibSearch style="width: 70%" />
    <ImageLibList style="width: 70%" />
    <ImageLibPagination style="width: 70%" />
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/shared/assets/styles/vars' as vars;
.imageLib-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: map.get(vars.$space, 'xxl');
  gap: map.get(vars.$space,'m')
}
</style>