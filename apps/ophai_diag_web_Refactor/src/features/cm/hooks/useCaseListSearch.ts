import { getCaseListService } from '../api/index.ts'
import { getCaseListViewObj} from '../types/index.ts'
import {useCaseListStore} from "../store/caseListStore";
import {useSearchQueryStore} from '@/features/cm/store/searchQueryStore.ts'
import { ref, toRaw } from 'vue'

const caseListStore = useCaseListStore();
const searchQueryStore = useSearchQueryStore();

export const useCaseListSearch = () => {

  const diseaseNameList = ref<string[]>([]);

  function handleSearch(isPage: boolean = false) {
    if (isPage) {
      searchQueryStore.setSearchQuery({
        ...toRaw(searchQueryStore.searchQuery),
        pageNum: 1
      })
    }

    console.log(searchQueryStore.searchQuery)

    // 处理疾病类型
    if (diseaseNameList.value.length === 0) {
      searchQueryStore.setSearchQuery({
        ...toRaw(searchQueryStore.searchQuery),
        diseaseName: "全部"
      })
    }else {
      searchQueryStore.setSearchQuery({
        ...toRaw(searchQueryStore.searchQuery),
        diseaseName: diseaseNameList.value.join(',')
      })
    }

    getCaseListService(searchQueryStore.searchQuery).then(res => {
      console.log(res)
      // 映射数据
      caseListStore.setCaseList(getCaseListViewObj(res.data));
    })
  }

  return { diseaseNameList,handleSearch }
};