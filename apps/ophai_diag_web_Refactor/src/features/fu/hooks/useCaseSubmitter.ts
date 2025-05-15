import { uploadCaseService } from '../api/index.ts'
import { useFileStore } from '../store/FileStore'
import {ElMessage} from "element-plus";

export function useCaseSubmitter() {
  const fileStore = useFileStore()
  const loading = ref(false)
  const BATCH_SIZE = 4 // 每批处理10个文件
  const handleSubmit = async () => {
    loading.value = true
    let startTime = performance.now()
    const rawFiles = fileStore.files?.map(item => item.raw as File) || []
     // 新增分片逻辑
     const fileBatches: File[][] = []
     for (let i = 0; i < rawFiles.length; i += BATCH_SIZE) {
       fileBatches.push(rawFiles.slice(i, i + BATCH_SIZE))
     }

     try {
      // 并行上传所有分片
      const results = await Promise.all(
        fileBatches.map(batch => {
          const formData = new FormData()
          batch.forEach(file => formData.append('files', file))
          return uploadCaseService(formData)
        })
      )

      if (results.every(res => res.code === 200)) {
        ElMessage.success('上传成功')
      }
      fileStore.setFiles([])
      let endTime = performance.now()
      console.log('上传耗时:', endTime - startTime,'ms')
    } catch (err) {
      console.error('提交失败:', err)
      ElMessage.error('上传失败')
    } finally {
      loading.value = false
    }

    // const formData = new FormData()
    // fileStore.files?.forEach(item => {
    //   formData.append('files', item.raw as File)
    // })

    // try {
    //   const res = await uploadCaseService(formData)
    //   if (res.code === 200) {
    //     ElMessage.success(res.message)
    //   }
    //   fileStore.setFiles([]) // 清空已上传文件
    //   let endTime = Date.now()
    //   console.log('上传耗时:', endTime - startTime, 'ms')
    // } catch (err) {
    //   console.error('提交失败:', err)
    // }
  }

  return { handleSubmit,loading }
}
