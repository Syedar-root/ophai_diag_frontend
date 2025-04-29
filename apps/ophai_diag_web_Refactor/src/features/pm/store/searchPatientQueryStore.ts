import {defineStore} from "pinia";
import {ref} from 'vue';

interface searchQuery {
    target: string;
    pageNum: number;
    pageSize: number
}

export const useSearchPatientQueryStore = defineStore('patientQuery',()=>{
    const searchPatientQuery = ref<searchQuery>({
        target:"",
        pageNum: 1,
        pageSize: 10,
    })
    function setSearchPatientQuery(newSearchPatientQuery: any) {
        searchPatientQuery.value = newSearchPatientQuery;
    }

    return {searchPatientQuery, setSearchPatientQuery}
})