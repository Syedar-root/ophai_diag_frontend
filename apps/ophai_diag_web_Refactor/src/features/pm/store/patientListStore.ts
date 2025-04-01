import {defineStore} from "pinia";
import { ref } from 'vue';

export const usePatientListStore = defineStore('patientList', ()=>{
    const patientList = ref({
        items: [{
            patientInfoId: '',
            patientName: '',
            age: '',
            gender: '',
        }],
        total: 1,
    });

    function setPatientList(newList:any){
        patientList.value = newList;
    }

    return {
        patientList,setPatientList
    }
})