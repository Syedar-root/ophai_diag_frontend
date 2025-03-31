import { validate,imageSchema } from '@/libs/utils/validate'
import type { UploadUserFile } from 'element-plus'
import { ref } from 'vue'

export function useFileValidator() {
  const userInfo = ref({
    patientId: '',
    patientName: '',
  })

  const validateImageName = async (fileList: UploadUserFile[]) : Promise<boolean> => {
    try {
      for (const uploadFile of fileList) {
        const file = uploadFile.raw!
        await validate({ name: file.name.toLowerCase() }, imageSchema)
        const nameList = file.name.split('_')
        userInfo.value.patientId = `${nameList[0]}_${nameList[1]}`
        userInfo.value.patientName = nameList[2]
      }
      return true
    } catch (e) {
      console.error('文件验证失败:', e)
      return false
    }
  }

  return { validateImageName, userInfo }
}
