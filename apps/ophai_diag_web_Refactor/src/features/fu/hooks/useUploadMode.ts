import { ref } from 'vue'
import { useFileStore } from '../store/FileStore'

export function useUploadMode(emit: (event: 'bulkUpload', value: boolean) => void) {
  const fileStore = useFileStore()
  const bulkUpload = ref(false)
  const uploadLimit = ref< number | undefined >(2);

  const handleModeChange = () => {
    uploadLimit.value = bulkUpload.value === false ? 2 : undefined
    emit('bulkUpload', bulkUpload.value)
    fileStore.setFiles([])
  }

  return {
    bulkUpload,
    handleModeChange,
    uploadLimit
  }
}

