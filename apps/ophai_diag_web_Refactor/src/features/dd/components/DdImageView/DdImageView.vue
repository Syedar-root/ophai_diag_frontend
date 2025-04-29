<script setup lang="ts">
  import { Picture } from '@element-plus/icons-vue'
  import { useImageInfo } from '@/features/dd/hooks/useImageInfo.ts'
  import { currentEye } from '@/features/dd/store/currentEye.ts'
  import { computed, onMounted, ref, onUnmounted } from 'vue'
  import {diseaseMap} from "@/features/dd/types";
  import {isEdit,editType,editedUrls} from "@/features/dd/store/isEdit.ts";

  const { imageInfo } = useImageInfo()
  const emptyText = ref('请前往病例管理页面选择病例查看')
  const empty = ref(false)
  onMounted(() => {
    if(imageInfo.value === null){
      empty.value = true;
      emptyText.value = "AI正在加速诊断中，请耐心等待"
    }
  })


  // 原图，血管图，视盘图的显示
  const currentType = ref('vessel')
  const previewImgUrl = computed(() => {
    if(imageInfo.value === null){
      return [];
    }
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
  const currentDisease = ref<string>(imageInfo.value ? imageInfo.value.diseaseCategories[0] : '')
  const heatmapOptions = computed(() => {
    if(imageInfo.value === null){
      return [];
    }
    return imageInfo.value.diseaseCategories.map((item) => {
      return {
        label: diseaseMap.get(item),
        value: item,
      }
    })
  })
  const heatmapPreviewImgUrl = computed(() => {
    if(imageInfo.value === null){
      return [];
    }
    if (currentEye.value === 'left') {
      return imageInfo.value.heatMapImages.get('left')?.get(currentDisease.value) || []
    }else {
      return imageInfo.value.heatMapImages.get('right')?.get(currentDisease.value) || []
    }
  })

  const previewSrcList = computed(() => {
    return currentType.value === 'heatmap' ? heatmapPreviewImgUrl.value : previewImgUrl.value
  })


  function handleShowOriginImage(){
    if (editedUrls.value.has(`${currentEye.value}_origin`)) {
      return editedUrls.value.get(`${currentEye.value}_origin`)
    }
    if(imageInfo.value === null){
      return null;
    }
    return imageInfo.value.originImages.get(currentEye.value)
  }


  function handleShowImage(){
    if(imageInfo.value === null){
      return null;
    }
    if(currentType.value === 'vessel'){
      console.log(editedUrls.value)
      if (editedUrls.value.has(`${currentEye.value}_vessels`)) {
        return editedUrls.value.get(`${currentEye.value}_vessels`)
      }
      return imageInfo.value.vesselImages.get(currentEye.value)
    }else if(currentType.value ==='disk'){
      if (editedUrls.value.has(`${currentEye.value}_disks`)) {
        return editedUrls.value.get(`${currentEye.value}_disks`)
      }
      return imageInfo.value.diskImages.get(currentEye.value)
    }else if(currentType.value === 'heatmap'){
      return (imageInfo.value.heatMapImages.get(currentEye.value)?.get(currentDisease.value) as string[])[2] || null
    }
  }

  function handleOptShow(e: MouseEvent) {
    const detailImg = document.querySelector('.detailImg') as HTMLElement
    const originImg = document.querySelector('.originImg') as HTMLElement
    const imgOpt = document.querySelector('.image-view__opt') as HTMLElement
    const otherEdit = document.querySelector('.other') as HTMLElement
    const originEdit = document.querySelector('.origin') as HTMLElement
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
        otherEdit.style.opacity = '1'
        otherEdit.style.visibility = 'visible'
      } else {
        imgOpt.style.opacity = '0'
        imgOpt.style.visibility = 'hidden'
        otherEdit.style.opacity = '0'
        otherEdit.style.visibility = 'hidden'
      }
    }
    if (originImg){
      const rect = originImg.getBoundingClientRect()
      if (
          rect.x < e.clientX &&
          e.clientX < rect.x + rect.width &&
          rect.y < e.clientY &&
          e.clientY < rect.y + rect.height
      ) {
        originEdit.style.opacity = '1'
        originEdit.style.visibility = 'visible'
      } else {
        originEdit.style.opacity = '0'
        originEdit.style.visibility = 'hidden'
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

  function handleOriginEdit(){
    if (imageInfo.value === null) return;
    editType.value = "origin"
    isEdit.value = true;
  }
  function handleOtherEdit(){
    if (imageInfo.value === null) return;
    editType.value = currentType.value
    isEdit.value = true;
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleOptShow)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleOptShow)
  })
</script>

<template>
  <div v-if="!empty && imageInfo" class="image-view">
    <el-image
      class="image-view__content originImg"
      :src="handleShowOriginImage()"
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
        :ref="el => tabRefs[0] = el as HTMLElement"
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
        :ref="el => tabRefs[1] = el as HTMLElement"
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
            :ref="el => tabRefs[2] = el as HTMLElement"
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
    <div class="image-view__edit origin">
      <el-button type="primary" @click="handleOriginEdit">前往标注</el-button>
    </div>
    <div class="image-view__edit other">
      <el-button type="primary" @click="handleOtherEdit">前往标注</el-button>
    </div>
  </div>
  <el-empty v-if="empty" :description="emptyText"></el-empty>
</template>

<style scoped lang="scss">
  @use 'styles';
</style>