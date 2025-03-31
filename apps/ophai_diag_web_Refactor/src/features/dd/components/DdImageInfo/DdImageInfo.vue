<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'
import {useImageInfo} from '@/features/dd/hooks/useImageInfo.ts'
import {currentEye} from '@/features/dd/store/currentEye.ts'

const { imageInfo } = useImageInfo()
</script>

<template>
  <div class="image-info-area">
    <span class="image-info-area__title">影像信息</span>
    <div class="image-info-area__content">
      <div class="images">
        <div
          class="images__item"
          @click="currentEye='left' "
          :class="{ 'images__item--is-active': currentEye === 'left' }">
          <el-image class="img" :src="imageInfo.images.get(`left_origin_url`)" fit="contain" hide-on-click-modal>
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
          <el-image class="img" :src="imageInfo.images.get(`right_origin_url`)" fit="contain" hide-on-click-modal>
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
          <span>512 X 512</span>
        </div>
        <div class="image-info__item">
          <label>拍摄时间：</label>
          <span>2022.91.90</span>
        </div>
        <div class="image-info__item">
          <label>医学影像技师：</label>
          <span>王大明</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>