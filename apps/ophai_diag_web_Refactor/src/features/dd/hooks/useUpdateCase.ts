import {ref} from 'vue';
import {type UpdateCaseQuery } from '@/features/dd/types'
import {useViewCaseStore} from '@/features/dd/store/viewCaseStore.ts'
import { ElMessage } from 'element-plus'
import {updateCaseService} from '@/features/dd/api'

export const useUpdateCase = () => {
  const viewCaseStore = useViewCaseStore()
  const updateCaseQuery = ref<UpdateCaseQuery>({
    caseId: viewCaseStore.viewCase.caseId,
    normalDiag: {
      doctorName:null,
      docSuggestions:"",
    },
    diseaseName: [] as string[]
  })

  function handleUpdate() {
    if (updateCaseQuery.value.normalDiag.docSuggestions === "") {
      ElMessage.error("请填写诊断结论");
      return;
    }
    updateCaseService(updateCaseQuery.value).then((res) => {
      if (res.code === 200){
        ElMessage.success(res.message);
      }
    })
  }

  return {
    updateCaseQuery,
    handleUpdate
  }
}
