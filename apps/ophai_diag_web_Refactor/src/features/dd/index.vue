<template>
  <keep-alive>
    <div class="dd-container" v-loading="loading">

      <div v-if="!isEmpty && !isEdit" class="dd-container__left">
        <DdPatientInfo :class="{
          'blur': patientInfoShow === false,
        }"></DdPatientInfo>
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
  </keep-alive>
</template>

<script setup lang="ts">
  import { computed, ref,onMounted } from 'vue'
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
  import {useUserStore} from "@/libs/store/user";
  import {Permission} from "@/shared/components/business/login/types.ts";

  const userStore = useUserStore();
  const patientInfoShow = computed(() => {
    return userStore.user.permission === Permission.DOCTOR || userStore.user.permission === Permission.ADMIN;
  })
  const loading = ref<boolean>(false);
  const emptyText = ref('请前往病例管理或影像库选择病例查看')
  const viewCaseStore = useViewCaseStore();
  const tempIdStore = useTempIdStore();
  const route = useRoute()
  const isEmpty = computed(() => {
    return viewCaseStore.viewCase === undefined;
  })
  onBeforeMount(() => {
    if (route.params.id !== ":id") {
      loading.value = true;
      getCaseService(route.params.id).then(res => {
        console.log(res)
        if (res.code === 403){
          emptyText.value = '您没有权限查看该病例'
          viewCaseStore.setViewCase({});
          return
        }
        viewCaseStore.setViewCase(res.data)
        tempIdStore.setTempId(res.data.caseId)
      }).finally(() => {
        loading.value = false;
      })
    }
  })

  onMounted(() => {
    if(route.params.id === ":id" && tempIdStore.tempId !== "") {
      loading.value = true;
      getCaseService(tempIdStore.tempId).then(res => {
        console.log(res)
        if (res.code === 403){
          emptyText.value = '您没有权限查看该病例'
          viewCaseStore.setViewCase({});
          return
        }
        viewCaseStore.setViewCase(res.data)
        tempIdStore.setTempId(res.data.caseId)
      }).finally(() => {
        loading.value = false;
      })
    }
  })
  // //
  // watch(
  //   () => route.params.id,
  //   (newVal) => {
  //     if (newVal) {
  //       loading.value = true;
  //       getCaseService(newVal).then(res => {
  //         loading.value = false;
  //         viewCaseStore.setViewCase(res.data)
  //       })
  //     }
  //   }
  // )

</script>

<style scoped lang="scss">
  @use 'styles';
  .blur{
   filter: blur(10px);
    pointer-events: none;
  }
</style>
