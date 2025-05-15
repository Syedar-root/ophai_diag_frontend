import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useViewCaseStore = defineStore('viewCase', ()=>{
  const viewCase = ref<any>();

  function setViewCase(caseObj: any){
    viewCase.value = caseObj;
  }

  return {
    viewCase,
    setViewCase
  }
}, {persist: true});