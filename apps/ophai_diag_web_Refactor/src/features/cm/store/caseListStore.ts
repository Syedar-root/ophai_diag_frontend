import {defineStore} from 'pinia';
import { ref } from 'vue'
import {type CaseListViewObj} from '@/features/cm/types'

export const useCaseListStore = defineStore('caseList', ()=>{
  const caseList = ref<CaseListViewObj>({
    items: [],
    total: 0
  })
  const setCaseList = (newList: CaseListViewObj) => {
    caseList.value = newList
  }
  return {caseList, setCaseList}
});