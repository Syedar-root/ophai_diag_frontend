import { ref } from 'vue'
import { useFileStore } from '../store/FileStore'

export function useUploadMode(emit: (event: 'bulkUpload', value: boolean) => void) {
  const fileStore = useFileStore()
  const bulkUpload = ref(false)

  const handleModeChange = () => {
    // const limit = bulkUpload.value ? 2 : undefined
    emit('bulkUpload', bulkUpload.value)
    fileStore.setFiles([])
  }

  return {
    bulkUpload,
    handleModeChange,
    uploadLimit: bulkUpload.value ? 2 : undefined
  }
}

