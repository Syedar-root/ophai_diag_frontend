<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'
import {useImageInfo} from '@/features/dd/hooks/useImageInfo.ts'
import {currentEye} from '@/features/dd/store/currentEye.ts'
import { computed, onMounted, ref,onUnmounted } from 'vue'

const {imageInfo} = useImageInfo()

const currentType = ref('vessel')
const previewImgUrl = computed(() => {
  const images = imageInfo.value.images
  if (currentEye.value === 'left') {
    return [
      images.get('left_origin_url')!,
      images.get('left_vessel_url')!,
      images.get('left_disk_url')!,
      images.get('left_heatmap_url')!
    ]
  } else {
    return [
      images.get('right_origin_url')!,
      images.get('right_vessel_url')!,
      images.get('right_disk_url')!,
      images.get('right_heatmap_url')!
    ]
  }
})

function handleOptShow(e: MouseEvent) {
  const detailImg = document.querySelector('.detailImg') as HTMLElement
  const imgOpt = document.querySelector('.image-view__opt') as HTMLElement
  if (detailImg) {
    const rect = detailImg.getBoundingClientRect()
    if (
      rect.x < e.clientX &&
      e.clientX < rect.x + rect.width &&
      rect.y < e.clientY &&
      e.clientY < rect.y + rect.height
    ) {
      imgOpt.style.opacity = '1'
      imgOpt.style.visibility = 'visible'
    } else {
      imgOpt.style.opacity = '0'
      imgOpt.style.visibility = 'hidden'
    }
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleOptShow)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', handleOptShow)
})
</script>

<template>
  <div class="image-view">
    <el-image
      class="image-view__content"
      :src="imageInfo.images.get(`${currentEye}_origin_url`)"
      :preview-src-list="previewImgUrl"
      fit="contain"
      hide-on-click-modal>
      <template #error>
        <div class="image-view__error">
          <el-icon size="1.5rem"><Picture /></el-icon>
          <span>诶呀粗错了</span>
        </div>
      </template>
    </el-image>
    <el-image
      class="image-view__content detailImg"
      :src="imageInfo.images.get(`${currentEye}_${currentType}_url`)"
      :preview-src-list="previewImgUrl"
      fit="contain"
      hide-on-click-modal>
      <template #error>
        <div class="image-view__error">
          <el-icon size="1.5rem"><Picture /></el-icon>
          <span>诶呀粗错了</span>
        </div>
      </template>
    </el-image>
    <div class="image-view__opt">
      <div
        class="opt-item"
        :class="{ active: currentType === 'vessel' }"
        @click="
              () => {
                currentType = 'vessel'
              }
            ">
        <div class="opt-item__inner">
          <span>血管</span>
        </div>
      </div>
      <div
        class="opt-item"
        :class="{ active: currentType === 'disk' }"
        @click="
              () => {
                currentType = 'disk'
              }
            ">
        <div class="opt-item__inner">
          <span>视盘</span>
        </div>
      </div>
      <div
        class="opt-item"
        :class="{ active: currentType === 'heatmap' }"
        @click="
              () => {
                currentType = 'heatmap'
              }
            ">
        <div class="opt-item__inner">
          <span>病灶图</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>