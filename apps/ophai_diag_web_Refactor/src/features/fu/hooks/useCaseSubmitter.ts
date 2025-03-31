import { uploadCaseService } from '../api/index.ts'
import { useFileStore } from '../store/FileStore'

export function useCaseSubmitter() {
  const fileStore = useFileStore()

  const handleSubmit = async () => {
    const formData = new FormData()
    fileStore.files?.forEach(item => {
      formData.append('file', item.raw as File)
    })

    try {
      const res = await uploadCaseService(formData)
      console.log('提交成功:', res)
      fileStore.setFiles([]) // 清空已上传文件
    } catch (err) {
      console.error('提交失败:', err)
    }
  }

  return { handleSubmit }
}
