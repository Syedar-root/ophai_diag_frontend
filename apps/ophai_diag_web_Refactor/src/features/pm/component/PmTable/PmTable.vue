<script setup lang="ts">
  import { usePatientListStore } from '@/features/pm/store/patientListStore.ts'
  import PmHistoryCase from '@/features/pm/component/PmHistoryCase/PmHistoryCase.vue'
  const patientListStore = usePatientListStore()
  const pmHistoryCaseShow = ref(false)
  const handleShowHistoryCase = (id :number) => {
    pmHistoryId.value = id;
    pmHistoryCaseShow.value = true;
  }
  const pmHistoryId = ref(0)
</script>

<template>
  <div class="pm-table">
    <el-table :data="patientListStore.patientList.items">
      <el-table-column prop="patientId" label="患者ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-link @click="handleShowHistoryCase(row.patientId)">查看历史病例</el-link>

        </template>
      </el-table-column>
    </el-table>
  </div>
  <transition name="fade">
    <PmHistoryCase v-if="pmHistoryCaseShow" :id="pmHistoryId" @close="pmHistoryCaseShow = false"></PmHistoryCase>
  </transition>
</template>

<style scoped lang="scss">
  @use 'sass:map';
  @use '@/shared/assets/styles/vars.scss' as vars;
  .pm-table {
    position: relative;
  }
  .el-table {
    --el-table-header-bg-color: #{map.get(vars.$colors, _white)};
  }

  .fade-enter-active,
  .fade-leave-active {
    opacity: 1;
    transition: opacity .3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>