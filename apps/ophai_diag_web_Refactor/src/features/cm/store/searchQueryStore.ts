import {defineStore} from 'pinia';
import { ref } from 'vue'
import {type CaseListQuery} from '@/features/cm/types'
export const useSearchQueryStore = defineStore('searchQuery', ()=>{
  const searchQuery = ref<CaseListQuery>({
    pageNum: 1,
    pageSize: 10,
    patientInfoPatientId: '',
    diseaseName: "全部",
    diagStatus: -1
  })
  const setSearchQuery = (newQuery: CaseListQuery) => {
    searchQuery.value = newQuery
  }
  return { searchQuery, setSearchQuery }
})