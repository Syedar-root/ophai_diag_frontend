<script setup lang="ts">
  import { searchImageLibQuery, handleSearchImage } from '../../hooks/useSearchImage.ts'
  import { debounce } from 'lodash-es'
  import { DiagStatusMap , DiseaseMap} from "@/features/imageLibrary/types.ts";
  import { useExportImage, useExportImageExcel,loading} from "@/features/imageLibrary/hooks/useExportImage.ts";

  const downloadImageText = ref('下载当页图片')
  const dateRange = ref<[string, string]>(["",""])
  const ageRange = ref<[number, number]>([0, 100])
  const handleSearch = () => {
    searchImageLibQuery.value.startDate = dateRange.value[0]
    searchImageLibQuery.value.endDate = dateRange.value[1]
    if (ageRange.value[0] > ageRange.value[1]) {
      ElMessage.error('年龄范围错误')
      return
    }
    searchImageLibQuery.value.StartAge = ageRange.value[0]
    searchImageLibQuery.value.EndAge = ageRange.value[1]
    handleSearchImage()
  }
  const debounceSearch = debounce(handleSearch, 500)
  const handleReset = () => {
    searchImageLibQuery.value = {
      diagStatus: -1,
      diseaseName: '全部',
      gender: -1,
      startDate: '',
      endDate: '',
      StartAge: 0,
      EndAge: 100,
      pageNum: 1,
      pageSize: 100
    }
  }
  const handleDownloadImages = () => {
    downloadImageText.value = '正在生成压缩包'
    ElMessage.info('后台正在生成压缩包，完成后会自动下载')
    useExportImage( downloadImageText )
  }
</script>

<template>
  <div class="imageLib-search-container">
    <el-form :model="searchImageLibQuery" label-position="left">
      <el-row :gutter="20">
        <el-col :span="8"><el-form-item label="诊断状态">
          <el-select v-model="searchImageLibQuery.diagStatus">
            <el-option v-for="(value, key) in DiagStatusMap" :key="key" :label="value[1]" :value="value[0]" />
          </el-select>
        </el-form-item></el-col>
        <el-col :span="8"><el-form-item label="疾病类型">
          <el-select v-model="searchImageLibQuery.diseaseName">
            <el-option v-for="(value, key) in DiseaseMap" :key="key" :label="value[1]" :value="value[1]" />
          </el-select>
        </el-form-item></el-col>
        <el-col :span="8"><el-form-item label="性别">
          <el-select v-model="searchImageLibQuery.gender">
            <el-option :value="-1" label="全部">全部</el-option>
            <el-option :value="0" label="男">男</el-option>
            <el-option :value="1" label="女">女</el-option>
          </el-select>
        </el-form-item></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"><el-form-item label="年龄范围">
          <el-row justify="start">
            <el-col :span="10">
              <el-input type="number" :max="ageRange[1]" v-model="ageRange[0]"/>
            </el-col>
            <el-col :span="4">
              <span>To</span>
            </el-col>
            <el-col :span="10">
              <el-input type="number" :min="ageRange[0]" v-model="ageRange[1]"/>
            </el-col>
          </el-row>
        </el-form-item></el-col>
        <el-col :span="12"><el-form-item label="日期范围">
          <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="To"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
          />
        </el-form-item></el-col>
      </el-row>
    </el-form>
    <div>
      <el-button type="primary" @click="debounceSearch">搜索</el-button>
      <el-button type="info" @click="handleReset">重置</el-button>
      <el-button type="warning" :loading="loading" @click="handleDownloadImages" >{{downloadImageText}}</el-button>
      <el-button type="warning" @click="useExportImageExcel" >下载当页Excel</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.imageLib-search-container{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: start;

  .el-form{
    position: relative;
    width: 100%;
  }
}
</style>