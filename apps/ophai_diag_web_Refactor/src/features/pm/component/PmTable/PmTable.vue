<script setup lang="ts">
import {usePatientListStore} from "@/features/pm/store/patientListStore.ts";

const patientListStore = usePatientListStore();
</script>

<template>
  <div class="pm-table">
    <el-table :data="patientListStore.patientList.items">
      <el-table-column prop="patientId" label="患者ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="操作">
        <template #default>
          <el-link>查看历史病例</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<style scoped lang="scss">

</style>