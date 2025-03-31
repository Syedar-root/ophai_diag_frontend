import {defineStore} from "pinia";
import type {UploadUserFile} from 'element-plus'
import {ref} from "vue";

export const useFileStore = defineStore('file', ()=>{
  const files = ref<UploadUserFile[]>();
  const setFiles = (newFiles: UploadUserFile[]) => {
    files.value = newFiles;
  }
  return { files, setFiles };
})