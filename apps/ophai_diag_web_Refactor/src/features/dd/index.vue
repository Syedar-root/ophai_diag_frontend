<template>
    <div class="dd-container" v-loading="loading">
        <div v-if="!isEmpty && !isEdit" class="dd-container__left">
          <DdPatientInfo></DdPatientInfo>
          <DdImageInfo></DdImageInfo>
        </div>
        <div v-if="!isEmpty && !isEdit" class="dd-container__center">
          <DdImageView></DdImageView>
          <DdAiDiagInfo></DdAiDiagInfo>
        </div>
        <div v-if="!isEmpty && !isEdit" class="dd-container__right">
          <DdReportInfo></DdReportInfo>
        </div>
      <DdImageEditor v-if="!isEmpty && isEdit"></DdImageEditor>
      <el-empty v-if="isEmpty" class="empty-container" :description="emptyText" />
    </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch,onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getCaseService } from './api'
  import {useViewCaseStore} from "@/features/dd/store/viewCaseStore.ts";
  import {useTempIdStore} from "@/features/dd/store/tempId.ts";
  import DdPatientInfo from '@/features/dd/components/DdPatientInfo/DdPatientInfo.vue'
  import DdImageInfo from '@/features/dd/components/DdImageInfo/DdImageInfo.vue'
  import DdImageView from '@/features/dd/components/DdImageView/DdImageView.vue'
  import DdAiDiagInfo from '@/features/dd/components/DdAiDiagInfo/DdAiDiagInfo.vue'
  import DdReportInfo from '@/features/dd/components/DdReportInfo/DdReportInfo.vue'
  import DdImageEditor from "@/features/dd/components/DdImageEditor/DdImageEditor.vue";
  import {isEdit} from "@/features/dd/store/isEdit.ts";

  const loading = ref<boolean>(false);
  const emptyText = ref('请前往病例管理页面选择病例查看')
  const viewCaseStore = useViewCaseStore();
  const tempIdStore = useTempIdStore();
  const route = useRoute()
  const isEmpty = computed(() => {
    return viewCaseStore.viewCase === undefined;
  })
  onBeforeMount(() => {
    if (route.params.id !== ":id") {
      getCaseService(route.params.id).then(res => {
        console.log(res.data)
        viewCaseStore.setViewCase(res.data)
        tempIdStore.setTempId(res.data.caseId)
      })
    }
  })

  onMounted(() => {
    if(route.params.id === ":id" && tempIdStore.tempId !== "") {
      getCaseService(tempIdStore.tempId).then(res => {
        viewCaseStore.setViewCase(res.data)
        tempIdStore.setTempId(res.data.caseId)
      })
    }
  })

  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal) {
        loading.value = true;
        getCaseService(newVal).then(res => {
          console.log(newVal)
          console.log(res)
          loading.value = false;
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
