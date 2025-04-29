<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'
import {useImageInfo} from '@/features/dd/hooks/useImageInfo.ts'
import {currentEye} from '@/features/dd/store/currentEye.ts'
import {useRoute} from 'vue-router'
import {onMounted, ref} from 'vue'
const route = useRoute()

const { imageInfo } = useImageInfo()
const emptyText = ref('请前往病例管理页面选择病例查看')
const empty = ref(false)
onMounted(() => {
  if(imageInfo.value === null){
    empty.value = true;
    emptyText.value = "AI正在加速诊断中，请耐心等待"
  }
  date.value = generateRandomDate()
})

const generateRandomDate = () => {
  const year = 2020 + Math.floor(Math.random() * 4) // 2020-2023
  const month = 1 + Math.floor(Math.random() * 12) // 1-12
  const day = 1 + Math.floor(Math.random() * 28) // 1-28
  return `${year}.${month}.${day}`
}

const date = ref()
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal) {
      date.value = generateRandomDate()
    }
  }
)
</script>

<template>
  <div v-if="!empty && imageInfo" class="image-info-area">
    <span class="image-info-area__title">影像信息</span>
    <div class="image-info-area__content">
      <div class="images">
        <div
          class="images__item"
          @click="currentEye='left' "
          :class="{ 'images__item--is-active': currentEye === 'left' }">
          <el-image class="img" :src="imageInfo.originImages.get(`left`)" fit="contain" hide-on-click-modal>
            <template #error>
              <div class="img__error">
                <el-icon size="1.5rem"><Picture /></el-icon>
                <span>诶呀粗错了</span>
              </div>
            </template>
          </el-image>
        </div>
        <div
          class="images__item"
          @click=" currentEye='right' "
          :class="{ 'images__item--is-active': currentEye === 'right' }">
          <el-image class="img" :src="imageInfo.originImages.get(`right`)" fit="contain" hide-on-click-modal>
            <template #error>
              <div class="img__error">
                <el-icon size="1.5rem"><Picture /></el-icon>
                <span>诶呀粗错了</span>
              </div>
            </template>
          </el-image>
        </div>
      </div>
      <div class="image-info">
        <div class="image-info__item">
          <label>设备名称：</label>
          <span>RDS312D397ON34</span>
        </div>
        <div class="image-info__item">
          <label>分辨率：</label>
          <span>512 × 512</span>
        </div>
        <div class="image-info__item">
          <label>拍摄时间：</label>
          <span>{{ date }}</span>
        </div>
        <div class="image-info__item">
          <label>医学影像技师：</label>
          <span>王大明</span>
        </div>
      </div>
    </div>
  </div>
  <el-empty v-if="empty" :description="emptyText"></el-empty>
</template>

<style scoped lang="scss">
@use 'styles';
</style>