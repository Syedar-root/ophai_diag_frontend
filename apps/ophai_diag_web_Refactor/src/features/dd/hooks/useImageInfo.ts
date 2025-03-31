import { computed} from 'vue'
import {type ImageInfoViewObj} from '@/features/dd/types'
import {useViewCaseStore} from '@/features/dd/store/viewCaseStore.ts';

export const useImageInfo = () => {
  const viewCaseStore = useViewCaseStore()
  
  const imageInfo = computed(()=>{
    const obj : ImageInfoViewObj = {
      images: new Map<string, string>(Object.entries(viewCaseStore.viewCase.aiCaseInfoJson.message.images as Object))
    }
    obj.images.set('left_origin_url', viewCaseStore.viewCase.originImageData.leftImage)
    obj.images.set('right_origin_url', viewCaseStore.viewCase.originImageData.rightImage)
    return obj;
  })

  return {
    imageInfo
  }
}