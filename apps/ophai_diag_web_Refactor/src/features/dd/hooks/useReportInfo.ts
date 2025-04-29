import { computed} from 'vue'
import {type ReportViewObj} from '@/features/dd/types'
import {useViewCaseStore} from '@/features/dd/store/viewCaseStore.ts'

export const useReportInfo = () => {
  const viewCaseStore = useViewCaseStore()
  
  const reportInfo = computed(() => {
    const reportViewObj: ReportViewObj = {
      createDate: viewCaseStore.viewCase.createDate,
      responsibleDoctor: viewCaseStore.viewCase.responsibleDoctor,
      historyDiags: viewCaseStore.viewCase.doctorDiags.map((item: any) => {
        return {
          doctor: item.doctorName,
          diagnosis: item.docSuggestions
        }
      }),
      diseaseTypes: viewCaseStore.viewCase.diseaseName,
      revisitTime: viewCaseStore.viewCase.aiCaseInfoJson.message.revisit_time,
    }
    return reportViewObj
  })

  return {
    reportInfo
  }
}