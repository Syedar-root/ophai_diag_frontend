<script setup lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
import {ref , onMounted} from "vue";
import { getPatientHistoryCase } from "@/features/pm/api";
import {formatDate} from "@/libs/utils/formatDate.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const historyCase = ref([
  {
    time: '2022-01-01',
    diseaseNames: '糖尿病',
    caseId: '123'
  },
  {
    time: '2022-01-02',
    diseaseNames: '高血压',
    caseId: '123'
  },
  {
    time: '2022-01-03',
    diseaseNames: '糖尿病',
    caseId: '123'
  }
])

const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}
const props = defineProps({
  id: String,
})
const loading = ref<boolean>(false);

onMounted(() => {
  loading.value = true;
  getPatientHistoryCase({patientId:props.id}).then((res) => {
    loading.value = false;
    console.log( '历史病例',res)
    historyCase.value = res.data.items.map((item: any) => {
      return {
        caseId:item.caseId,
        time: formatDate(item.createDate),
        diseaseNames: item.diseaseName
      }
    })
  })
})

</script>

<template>
  <div class="pm-history-case-wrapper" @click="handleClose">
    <section class="pm-history-case" v-loading="loading" @click.stop>
      <label class="pm-history-case__title">
        历史病例
      </label>
      <div class="pm-history-case__content history-case">
        <div class="history-case-item" v-for="item in historyCase" @click="router.push(`/dd/${item.caseId}`)" >
          <div class="history-case-item__description">
            <label class="time">{{item.time}}</label>
            <label class="disease"><el-tag v-for="disease in item.diseaseNames">{{disease || "不详"}}</el-tag></label>
          </div>
          <div class="history-case-item__icon">
            <el-icon>
              <ArrowRight></ArrowRight>
            </el-icon>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<style scoped lang="scss">
@use "styles";
</style>