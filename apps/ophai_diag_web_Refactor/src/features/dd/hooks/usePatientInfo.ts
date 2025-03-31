import { computed} from 'vue'
import {type PatientInfoViewObj} from '@/features/dd/types'
import {useViewCaseStore} from '@/features/dd/store/viewCaseStore.ts'

export const usePatientInfo = () => {
  const viewCaseStore = useViewCaseStore()

  const patientInfo = computed(()=>{
    console.log(viewCaseStore.viewCase)
    const obj : PatientInfoViewObj = {
      id: viewCaseStore.viewCase.patientInfo.patientId.toUpperCase(),
      name: viewCaseStore.viewCase.patientInfo.name,
      age: viewCaseStore.viewCase.patientInfo.age,
      gender: viewCaseStore.viewCase.patientInfo.gender,
      historyCases: viewCaseStore.viewCase.historyCaseListDto.items.map((item: any) => {
        return {
          caseId: item.caseId,
          createDate: item.createDate,
          updateDate: item.updateDate,
          diseaseTypes: item.diseaseTypes,
          diagStatus: item.diagStatus
        }
      })
    }
    return obj;
  });

  return {
    patientInfo
  }
}