// import {computed} from 'vue';
import {type Mark, type UpdateCaseQuery} from '@/features/dd/types'
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
      diseaseName: [] as string[],
      marks: viewCaseStore.viewCase.marks as Mark[] || [] as Mark[],
    })

  function handleUpdate() {
    updateCaseQuery.value.caseId = viewCaseStore.viewCase.caseId
    console.log(updateCaseQuery.value.caseId)
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

  async function handleMarkChange(mark: Mark) {
    const index = updateCaseQuery.value.marks.findIndex((m) => m.id === mark.id);
    if (index !== -1) {
      updateCaseQuery.value.marks[index] = mark;
    } else {
      updateCaseQuery.value.marks.push(mark);
    }
    updateCaseQuery.value.caseId = viewCaseStore.viewCase.caseId
    return updateCaseService(updateCaseQuery.value).then((res) => {
      if (res.code === 200){
        ElMessage.success(res.message);
      }
    })
  }

  return {
    updateCaseQuery,
    handleUpdate,
    handleMarkChange
  }
}
