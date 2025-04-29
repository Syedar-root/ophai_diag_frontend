import {defineStore} from "pinia";
import { ref } from 'vue';

interface PatientList {
    items:[{
        patientInfoId: string,
        patientName: string,
        age: string,
        gender: string,
    }],
    total: number,
}

export const usePatientListStore = defineStore('patientList', ()=>{
    const patientList = ref<PatientList>();

    function setPatientList(newList:any){
        patientList.value = newList;
    }

    return {
        patientList,setPatientList
    }
})