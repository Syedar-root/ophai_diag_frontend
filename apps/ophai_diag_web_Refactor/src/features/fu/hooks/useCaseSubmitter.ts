import { uploadCaseService } from '../api/index.ts'
import { useFileStore } from '../store/FileStore'
import {ElMessage} from "element-plus";

export function useCaseSubmitter() {
  const fileStore = useFileStore()

  const handleSubmit = async () => {
    const formData = new FormData()
    fileStore.files?.forEach(item => {
      formData.append('files', item.raw as File)
    })

    try {
      const res = await uploadCaseService(formData)
      if (res.code === 200) {
        ElMessage.success(res.message)
      }
      fileStore.setFiles([]) // 清空已上传文件
    } catch (err) {
      console.error('提交失败:', err)
    }
  }

  return { handleSubmit }
}
