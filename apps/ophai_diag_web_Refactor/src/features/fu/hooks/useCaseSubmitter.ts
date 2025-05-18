import { uploadCaseService } from '../api/index.ts'
import { useFileStore } from '../store/FileStore'
import { ElMessage } from 'element-plus'

export function useCaseSubmitter() {
  const fileStore = useFileStore()
  const loading = ref(false)
  let BATCH_SIZE = 4 // 每批处理10个文件
  const handleSubmit = async () => {
    loading.value = true
    let startTime = performance.now()
    const rawFiles = fileStore.files?.map(item => item.raw as File) || []
    if (rawFiles.length % 2 !== 0) {
      ElMessage.error('请上传正确数量的图片')
      return
    }
    // 新增分片逻辑
    const fileGroups: Record<string, File[]> = {}
    rawFiles.forEach(file => {
      const id = file.name.split('_')[1]
      if (!fileGroups[id]) {
        fileGroups[id] = []
      }
      fileGroups[id].push(file)
    })

    // 检查每个分组是否有两个文件
    for (const id in fileGroups) {
      if (fileGroups[id].length !== 2) {
        ElMessage.error(`ID为 PA_${id} 的文件数量不正确`)
        return
      }
    }

    BATCH_SIZE = Math.max(Math.ceil(rawFiles.length / 6), 2)
    const groupedBatches: File[][] = []
    const groupValues = Object.values(fileGroups)
    for (let i = 0; i < groupValues.length; i += BATCH_SIZE) {
      const batch = groupValues.slice(i, i + BATCH_SIZE).flat()
      groupedBatches.push(batch)
    }

    try {
      // 并行上传所有分片
      ElMessage.warning('后台正在上传中，请耐心等待')
      const results = await Promise.all(
        groupedBatches.map(batch => {
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
      console.log('上传耗时:', endTime - startTime, 'ms')
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

  return { handleSubmit, loading }
}
