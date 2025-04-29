<script setup lang="ts">
import {CirclePlus, Search} from "@element-plus/icons-vue";
import {usePatientListSearch} from "@/features/pm/hooks/usePatientListSearch.ts";
import {useSearchPatientQueryStore} from "@/features/pm/store/searchPatientQueryStore.ts";
import {ElMessageBox} from "element-plus";
import {usePatientInfoAdd} from "@/features/pm/hooks/usePatientInfoAdd.ts";

const searchPatientQueryStore = useSearchPatientQueryStore();
const {handleSearch} = usePatientListSearch()
const addDialogVisible = ref(false);
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭吗？')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
const { patientInfo,addLoading,handleAdd } = usePatientInfoAdd()
const genderType = [
  {
    value: 0,
    label: '男'
  },
  {
    value: 1,
    label: '女'
  }
]

const handleSubmit = async () => {
  await handleAdd().then((res) => {
    if (res === true){
      addDialogVisible.value = false
      handleSearch();
    }else {
      return;
    }
  })
}
</script>

<template>
<div class="pm-search">
  <div class="pm-search__input">
    <el-input
        :prefix-icon="Search"
        v-model="searchPatientQueryStore.searchPatientQuery.target"
        placeholder="请输入患者姓名"
        @keyup.enter.native="handleSearch()"
        clearable>
    </el-input>
    <el-button type="primary" @click="handleSearch()">搜索</el-button>
  </div>
  <div class="pm-search__input">
    <el-button style="width: 5%" type="primary" :icon="CirclePlus" @click="addDialogVisible = true">添加患者</el-button>
  </div>
  <el-dialog
      v-model="addDialogVisible"
      title="添加患者"
      width="500"
      :before-close="handleClose">
    <el-form  v-loading="addLoading">
      <el-form-item label="姓名">
        <el-input v-model="patientInfo.name"></el-input>
        </el-form-item>
      <el-form-item label="年龄">
        <el-input-number type="number" :min=0 :max=150 v-model="patientInfo.age"></el-input-number>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="patientInfo.gender" placeholder="Select" style="width: 240px">
          <el-option
              v-for="item in genderType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
<!--  <div class="pm-search__select">-->
<!--    <label>疾病分类</label>-->
<!--    <el-select-->
<!--        v-model="diseaseNameList"-->
<!--        multiple-->
<!--        filterable-->
<!--        allow-create-->
<!--        default-first-option-->
<!--        :reserve-keyword="false"-->
<!--        placeholder="请选择要查询的内容"-->
<!--        clearable-->
<!--        @blur="handleSearch">-->
<!--      <el-option-->
<!--          v-for="item in diseaseType"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.label"></el-option>-->
<!--    </el-select>-->
<!--  </div>-->
</div>
</template>

<style scoped lang="scss">
@use "styles";
</style>