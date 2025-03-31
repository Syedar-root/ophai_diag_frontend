<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'
import { computed } from 'vue'
import {useFileStore} from '@/features/fu/store/FileStore.ts'

const fileStore = useFileStore()
const previewSrcList = computed(() => {
  const srcList: string[] = []
  for (const uploadFile of fileStore.files ?? []){
     const file = uploadFile.raw!;
     const fileName = file.name;
     if(fileName.toLowerCase().includes("left")){
       srcList[0] = URL.createObjectURL(file);
     }else if(fileName.toLowerCase().includes("right")){
       srcList[1] = URL.createObjectURL(file);
     }
  }
  return srcList;
})
</script>

<template>
  <div class="single-upload-container" style="flex-direction: row">
    <div class="single-upload-container__content">
      <div class="single-upload-container__title">
        <span>左眼</span>
      </div>
      <div class="image-item">
        <span>原始图像</span>
        <el-image class="image-item__image" fit="contain" :preview-src-list="previewSrcList" :src="previewSrcList[0]">
          <template #error>
            <div class="image-item__error">
              <el-icon size="1.5rem"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>
    </div>
    <div class="single-upload-container__content">
      <div class="single-upload-container__title">
        <span>右眼</span>
      </div>
      <div class="image-item">
        <span>原始图像</span>
        <el-image class="image-item__image" fit="contain" :preview-src-list="previewSrcList" :src="previewSrcList[1]">
          <template #error>
            <div class="image-item__error">
              <el-icon size="1.5rem"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "styles";
</style>