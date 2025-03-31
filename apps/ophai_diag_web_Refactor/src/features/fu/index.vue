<template>
    <div class="fu-container">
      <div class="fu-container__main">
        <!--        左边-->
        <FuUpload @bulk-upload="(val) =>{ bulkUpload = val }" />
        <!--        右边-->
        <div class="fu-container__main-right">
          <!--          单个上传-->
          <FuSinglePreview  v-show="!bulkUpload" />
          <!--          批量上传-->
          <FuBulkPreview v-show="bulkUpload" />
        </div>
      </div>

      <transition name="move--up">
        <FuFooter v-show="footerShow"/>
      </transition>
    </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted,onUnmounted,defineAsyncComponent} from 'vue'
  import FuUpload from '@/features/fu/components/FuUpload/FuUpload.vue'
  import FuSinglePreview from '@/features/fu/components/FuSinglePreview/FuSinglePreview.vue'
  // import FuBulkPreview from '@/features/fu/components/FuBulkPreview/FuBulkPreview.vue'
  // import FuFooter from '@/features/fu/components/FuFooter/FuFooter.vue'

  const FuBulkPreview = defineAsyncComponent({
    loader: () => import('@/features/fu/components/FuBulkPreview/FuBulkPreview.vue'),
    timeout: 10000,
  })
  const FuFooter = defineAsyncComponent({
    loader: () => import('@/features/fu/components/FuFooter/FuFooter.vue'),
    timeout: 10000,
  })


  const footerShow = ref<boolean>(false)
  const bulkUpload = ref<boolean>(false)
  const mouseHandler = (e: MouseEvent) => {
    footerShow.value = e.y > window.innerHeight / 1.5
  }
  onMounted(() => document.addEventListener('mousemove', mouseHandler))
  onUnmounted(() => document.removeEventListener('mousemove', mouseHandler))
</script>

<style scoped lang="scss">
  @use 'styles';
</style>
