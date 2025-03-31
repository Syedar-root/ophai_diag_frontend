import { computed } from 'vue'
import { useFileStore } from '../store/FileStore'
import type { BulkPreview } from '../components/FuBulkPreview/types.ts'

export function useBulkPreview() {
  const fileStore = useFileStore()

  const bulkMap = computed(() => {
    const map = new Map<string, BulkPreview>()
    for (const uploadFile of fileStore.files ?? []) {
      const file = uploadFile.raw!
      const fileName = file.name
      const nameList = fileName.split('_')
      const id = `${nameList[0]}_${nameList[1]}`

      if (!map.has(id)) {
        const isLeft = fileName.toLowerCase().includes("left")
        map.set(id, {
          previewLeft: isLeft ? URL.createObjectURL(file) : '',
          previewRight: !isLeft ? URL.createObjectURL(file) : '',
          patientId: id,
          patientName: nameList[2]
        })
      } else {
        const bulkPreview = map.get(id)!
        fileName.toLowerCase().includes("left")
          ? bulkPreview.previewLeft = URL.createObjectURL(file)
          : bulkPreview.previewRight = URL.createObjectURL(file)
      }
    }
    return map
  })

  return { bulkMap }
}
