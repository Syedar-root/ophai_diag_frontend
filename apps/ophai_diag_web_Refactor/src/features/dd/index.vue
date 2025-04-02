<template>
  <div class="dd-container">
    <div v-if="!isEmpty" class="dd-container__left">
      <DdPatientInfo></DdPatientInfo>
      <DdImageInfo></DdImageInfo>
    </div>

    <div v-if="!isEmpty" class="dd-container__center">
      <DdImageView></DdImageView>
      <DdAiDiagInfo></DdAiDiagInfo>
    </div>

    <div v-if="!isEmpty" class="dd-container__right">
      <DdReportInfo></DdReportInfo>
    </div>

    <el-empty v-if="isEmpty" class="empty-container" :description="emptyText" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch,onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getCaseService } from './api'
  import {useViewCaseStore} from "@/features/dd/store/viewCaseStore.ts";
  import DdPatientInfo from '@/features/dd/components/DdPatientInfo/DdPatientInfo.vue'
  import DdImageInfo from '@/features/dd/components/DdImageInfo/DdImageInfo.vue'
  import DdImageView from '@/features/dd/components/DdImageView/DdImageView.vue'
  import DdAiDiagInfo from '@/features/dd/components/DdAiDiagInfo/DdAiDiagInfo.vue'
  import DdReportInfo from '@/features/dd/components/DdReportInfo/DdReportInfo.vue'


  const emptyText = ref('请前往病例管理页面选择病例查看')
  const viewCaseStore = useViewCaseStore();
  const route = useRoute()
  const isEmpty = computed(() => {
    return viewCaseStore.viewCase === undefined;
  })
  onMounted(() => {
    if (route.params.id) {
      getCaseService(route.params.id).then(res => {
        console.log(res)
        viewCaseStore.setViewCase(res.data)
      })
    }
  })
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal) {
        getCaseService(newVal).then(res => {
          console.log(res)
          viewCaseStore.setViewCase(res.data)
        })
      }
      console.log(viewCaseStore.viewCase)
    }// 立即执行一次以处理初始路由
  )

</script>

<style scoped lang="scss">
  @use 'styles';
</style>
