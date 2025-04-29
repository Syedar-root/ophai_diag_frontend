import { getCaseListService } from '../api/index.ts'
import { getCaseListViewObj} from '../types/index.ts'
import {useCaseListStore} from "../store/caseListStore";
import {useSearchQueryStore} from '@/features/cm/store/searchQueryStore.ts'
import { ref, toRaw } from 'vue'

const caseListStore = useCaseListStore();
const searchQueryStore = useSearchQueryStore();

export const useCaseListSearch = () => {

  const diseaseNameList = ref<string[]>([]);
  const loading = ref<boolean>(false)

  function handleSearch(isPage: boolean = false) {
    if (!isPage) {
      searchQueryStore.setSearchQuery({
        ...toRaw(searchQueryStore.searchQuery),
        pageNum: 1
      })
    }

    // console.log(searchQueryStore.searchQuery)

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

    loading.value = true;

    getCaseListService(searchQueryStore.searchQuery).then(res => {
      console.log(res)
      if (res.code !== 200) {
        return
      }else if(res.code === 200) {
        ElMessage.success(res.message)
      }
      // 映射数据
      caseListStore.setCaseList(getCaseListViewObj(res.data));
      loading.value = false;
    }).catch(e=>{
      ElMessage.error(e)
    }).finally(()=>{
      loading.value = false;
    })
  }

  return { diseaseNameList,handleSearch, loading }
};