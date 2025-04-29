<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue';
import {ElMessage, type UploadUserFile} from 'element-plus'
import {type FuUploadEmits} from './types.ts'
import {useFileStore} from '@/features/fu/store/FileStore.ts'
import {useFileValidator} from '@/features/fu/hooks/useFileValidator.ts'
import {useUploadMode} from '@/features/fu/hooks/useUploadMode.ts'


const emits = defineEmits<FuUploadEmits>()
const fileStore = useFileStore()

// 文件列表
const fileList = ref<UploadUserFile[]>([])

const { validateImageName,userInfo } = useFileValidator();

const handleFileChange = (_: any, uploadFiles: UploadUserFile[]) => {
  if (!validateImageName(uploadFiles)){
    return;
  }
  fileStore.setFiles(uploadFiles);
}

const handleFileRemove = (_: any, uploadFiles: UploadUserFile[]) => {
  fileStore.setFiles(uploadFiles);
}

const handleFileExceed = () => {
  console.log(uploadLimit)
  ElMessage.warning('文件数量超过限制');
}

watch(()=>fileStore.files,(newFiles)=>{
  fileList.value = newFiles || [];
  if(newFiles.length === 0){
    userInfo.value.patientName = "";
    userInfo.value.patientId = "";
  }
})


const { bulkUpload,handleModeChange,uploadLimit } = useUploadMode(emits)
</script>

<template>
  <div class="fu-upload-container">
    <div class="picture-upload-container">
      <div class="picture-upload-container__title">
        <span>图片上传</span>
        <span class="bulkSwitch">
              <el-switch v-model="bulkUpload" active-text="批量上传" @change="handleModeChange" />
            </span>
      </div>
      <el-upload
        class="picture-upload-container__upload"
        :show-file-list="true"
        v-model:file-list="fileList"
        :limit="uploadLimit"
        :on-remove="handleFileRemove"
        :on-change="handleFileChange"
        :on-exceed="handleFileExceed"
        action="#"
        drag
        multiple
        :auto-upload="false"
        accept=".jpg">
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="upload--text">图片拖拽到此处或单击此处</div>
        <template #tip>
          <div class="upload--tip">仅支持jpg格式。图片命名需要以 患者ID_患者姓名_left（或_right）来区分左右眼</div>
        </template>
      </el-upload>
    </div>

    <div class="fu-container__block patient-info-container" v-show="!bulkUpload">
      <div class="patient-info-container__title">
        <span>患者信息</span>
      </div>
      <el-form class="patient-info-container__form" label-position="top" require-asterisk-position="right">
        <el-row :gutter="10" justify="space-between">
          <el-col :span="12">
            <el-form-item label="患者ID" required>
              <el-input disabled v-model="userInfo.patientId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" required>
              <el-input disabled v-model="userInfo.patientName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>