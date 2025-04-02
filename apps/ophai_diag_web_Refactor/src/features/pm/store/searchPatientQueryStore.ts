import {defineStore} from "pinia";
import {ref} from 'vue';

export const useSearchPatientQueryStore = defineStore('patientQuery',()=>{
    const searchPatientQuery = ref({
        target:"",
        pageNum: 1,
        pageSize: 10,
    })
    function setSearchPatientQuery(newSearchPatientQuery: any) {
        searchPatientQuery.value = newSearchPatientQuery;
    }

    return {searchPatientQuery, setSearchPatientQuery}
})