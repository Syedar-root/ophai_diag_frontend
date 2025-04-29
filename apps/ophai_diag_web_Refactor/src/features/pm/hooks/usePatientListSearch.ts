import {ref} from 'vue';
import {useSearchPatientQueryStore} from "@/features/pm/store/searchPatientQueryStore.ts";
import {getPatientListService} from "@/features/pm/api/index.ts";
import {usePatientListStore} from "@/features/pm/store/patientListStore.ts";

export const usePatientListSearch = () => {
    const searchQueryStore = useSearchPatientQueryStore();
    const patientListStore = usePatientListStore();
    const diseaseNameList = ref([])
    const loading = ref(false);
    function handleSearch(isPage: boolean = false) {
        if (!isPage) {
            searchQueryStore.setSearchPatientQuery({
                ...searchQueryStore.searchPatientQuery,
                pageNum: 1
            })
        }
        if(searchQueryStore.searchPatientQuery.target === "")
            searchQueryStore.setSearchPatientQuery({
                ...searchQueryStore.searchPatientQuery,
                target: ""
            })
        // searchQueryStore.searchPatientQuery.diseaseName = diseaseNameList.value.join(',')
        // if (searchQueryStore.searchPatientQuery.diseaseName.includes("全部")) {
        //     searchQueryStore.searchPatientQuery.diseaseName = '全部'
        // }
        // console.log(searchQueryStore.searchPatientQuery)
        loading.value = true;
        getPatientListService(searchQueryStore.searchPatientQuery).then((res: any) => {
            console.log(res)
            patientListStore.setPatientList(res.data)
            loading.value = false
        }).finally(() => {
            loading.value = false
        })
    }
    return { diseaseNameList,handleSearch ,loading}
}