import {ref} from 'vue';
import {useSearchPatientQueryStore} from "@/features/pm/store/searchPatientQueryStore.ts";

export const usePatientListSearch = () => {
    const searchQueryStore = useSearchPatientQueryStore();
    const diseaseNameList = ref([])
    function handleSearch(isPage: boolean = false) {
        if (!isPage) {
            searchQueryStore.setSearchPatientQuery({
                ...searchQueryStore.searchPatientQuery,
                pageNum: 1
            })
        }
        searchQueryStore.searchPatientQuery.diseaseName = diseaseNameList.value.join(',')
        if (searchQueryStore.searchPatientQuery.diseaseName.includes("全部")) {
            searchQueryStore.searchPatientQuery.diseaseName = '全部'
        }
        console.log(searchQueryStore.searchPatientQuery)
    }

    return { diseaseNameList,handleSearch }
}