import { computed } from 'vue'
import {type AIDiagViewObj} from '@/features/dd/types'
import {useViewCaseStore} from '@/features/dd/store/viewCaseStore.ts';

export const useAiDiagInfo = () => {
  const viewCaseStore = useViewCaseStore()
  
  const aiDiagInfo = computed(()=>{
    const obj : AIDiagViewObj = {
      suggestions: viewCaseStore.viewCase.aiCaseInfoJson.message.suggestions,
      drugs: viewCaseStore.viewCase.aiCaseInfoJson.message.drugs,
      predictions: new Map<string, number>(Object.entries(viewCaseStore.viewCase.aiCaseInfoJson.message.predictions))
    }
    return obj;
  })
  return {aiDiagInfo};
}