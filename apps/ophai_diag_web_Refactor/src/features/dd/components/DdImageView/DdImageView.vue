<script setup lang="ts">
  import { Picture } from '@element-plus/icons-vue'
  import { useImageInfo } from '@/features/dd/hooks/useImageInfo.ts'
  import { currentEye } from '@/features/dd/store/currentEye.ts'
  import { computed, onMounted, ref, onUnmounted } from 'vue'
  import {diseaseMap} from "@/features/dd/types";

  const { imageInfo } = useImageInfo()

  onMounted(() => {
    console.log('imageInfo', imageInfo.value)
  })


  // 原图，血管图，视盘图的显示
  const currentType = ref('vessel')
  const previewImgUrl = computed(() => {
    if(currentType.value === 'heatmap'){
      return [];
    }
    const images = imageInfo.value
    const eye = currentEye.value as 'left' | 'right'
    const type = currentType.value as 'vessel' | 'disk'

    const imageMap = {
      vessel: images.vesselImages,
      disk: images.diskImages
    }

    return [
      imageMap[type].get(eye)!,
      images.originImages.get(eye)!
    ]
  })

  // 病灶热力图的显示
  const currentDisease = ref<string>(imageInfo.value.diseaseCategories[0])
  const heatmapOptions = computed(() => {
    return imageInfo.value.diseaseCategories.map((item) => {
      return {
        label: diseaseMap.get(item),
        value: item,
      }
    })
  })
  const heatmapPreviewImgUrl = computed(() => {
    if (currentEye.value === 'left') {
      return imageInfo.value.heatMapImages.get('left')?.get(currentDisease.value) || []
    }else {
      return imageInfo.value.heatMapImages.get('right')?.get(currentDisease.value) || []
    }
  })

  const previewSrcList = computed(() => {
    return currentType.value === 'heatmap' ? heatmapPreviewImgUrl.value : previewImgUrl.value
  })

  function handleShowImage(){
    if(currentType.value === 'vessel'){
      return imageInfo.value.vesselImages.get(currentEye.value)
    }else if(currentType.value ==='disk'){
      return imageInfo.value.diskImages.get(currentEye.value)
    }else if(currentType.value === 'heatmap'){
      return (imageInfo.value.heatMapImages.get(currentEye.value)?.get(currentDisease.value) as string[])[0] || null
    }
  }

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

  const tabsContainerRef = ref<HTMLElement | null>(null) // 父容器 ref
  const tabRefs = ref<HTMLElement[]>([])
  const activeIndex = ref(0)

  const tabStyle = computed(() => {
    const item = tabRefs.value[activeIndex.value]
    const container = tabsContainerRef.value
    if (item && container) {
      const itemRect = item.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      // 计算相对于父容器的 top 位置
      const topRelativeToContainer = itemRect.top - containerRect.top
      return {
        top: topRelativeToContainer + 'px',
        height: itemRect.height + 'px',
      }
    }
    return {
      top: '0',
      height: '55px',
    }
  })



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
      :src="imageInfo.originImages.get(`${currentEye}`)"
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
      :src="handleShowImage()"
      :preview-src-list="previewSrcList"
      fit="contain"
      hide-on-click-modal>
      <template #error>
        <div class="image-view__error">
          <el-icon size="1.5rem"><Picture /></el-icon>
          <span>诶呀粗错了</span>
        </div>
      </template>
    </el-image>
    <div class="image-view__opt" ref="tabsContainerRef">
      <div
          class="opt-tab"
          :style="tabStyle"
          ></div>
      <div
        class="opt-item"
        :ref="el => tabRefs[0] = el"
        :class="{
          active: currentType === 'vessel'}"
        @click="
          () => {
            currentType = 'vessel'
            activeIndex = 0
          }
        ">
        <div class="opt-item__inner">
          <span>血管</span>
        </div>
      </div>
      <div
        class="opt-item"
        :ref="el => tabRefs[1] = el"
        :class="{ active: currentType === 'disk' }"
        @click="
          () => {
            currentType = 'disk'
            activeIndex = 1
          }
        ">
        <div class="opt-item__inner">
          <span>视盘</span>
        </div>
      </div>
      <el-dropdown :disabled="currentType !== 'heatmap'"  trigger="click">
      <el-badge :value="12" :offset="[-5,5]">
        <div
            class="opt-item"
            :ref="el => tabRefs[2] = el"
            :class="{ active: currentType === 'heatmap' }"
            @click="
          () => {
            currentType = 'heatmap'
            activeIndex = 2
          }
        ">
          <div class="opt-item__inner">
            <span>病灶图</span>
          </div>
        </div>
      </el-badge>
        <template #dropdown>
          <el-segmented v-model="currentDisease" :options="heatmapOptions" direction="vertical" />
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use 'styles';
</style>