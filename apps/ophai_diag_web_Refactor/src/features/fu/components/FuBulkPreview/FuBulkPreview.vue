<script setup lang="ts">
import { useBulkPreview } from '@/features/fu/hooks/useBulkPreview.ts'

const { bulkMap } = useBulkPreview()
</script>

<template>
  <div class="bulk-upload-container">
    <div class="grid-item" v-for="([id,patient], index) in bulkMap" :key="index">
      <div class="grid-item__label">
        <label>ID：{{ id }}</label>
        <label>姓名：{{ patient.patientName }}</label>
      </div>
      <el-image
        class="grid-item__image"
        fit="contain"
        :lazy="true"
        :src="patient.previewLeft"
        :preview-teleported="true"
        :preview-src-list="[patient.previewLeft, patient.previewRight]">
        <template #error>
          <div class="grid-item__error">左眼图片未上传</div>
        </template>
      </el-image>
      <el-image
        class="grid-item__image"
        fit="contain"
        :lazy="true"
        :src="patient.previewRight"
        :preview-teleported="true"
        :preview-src-list="[patient.previewLeft, patient.previewRight]">
        <template #error>
          <div class="grid-item__error">右眼图片未上传</div>
        </template>
      </el-image>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "styles";
</style>