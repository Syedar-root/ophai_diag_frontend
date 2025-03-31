<script setup lang="ts">
import { useCaseSubmitter } from '@/features/fu/hooks/useCaseSubmitter'

const { handleSubmit } = useCaseSubmitter()
</script>

<template>
  <div class="fu-container__footer">
    <el-button type="info">重置</el-button>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>