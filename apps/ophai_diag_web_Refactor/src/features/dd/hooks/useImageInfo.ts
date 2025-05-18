import { computed} from 'vue'
import {type HeatMapImage, type ImageInfoViewObj} from '@/features/dd/types'
import {useViewCaseStore} from '@/features/dd/store/viewCaseStore.ts';

export const useImageInfo = () => {
  const viewCaseStore = useViewCaseStore()

  const imageInfo = computed(()=>{
    if(!viewCaseStore.viewCase.aiCaseInfoJson){
      return null;
    }
    let images = viewCaseStore.viewCase.aiCaseInfoJson.message.images;
    const obj : ImageInfoViewObj = {
      originImages: new Map([
        ['left',images.original.left],
        ['right', images.original.right]
      ]),
      vesselImages: new Map([
        ['left', images.vessels.left],
        ['right', images.vessels.right]
      ]),
      diskImages: new Map([
        ['left', images.disks.left],
        ['right', images.disks.right]
      ]),
      heatMapImages: (()=>{
        const map = new Map<string, HeatMapImage>();

        // 处理左侧热图
        const leftHeatMap: HeatMapImage = new Map();
        for (const [type, urls] of Object.entries(images.heatmaps.left)) {
          leftHeatMap.set(type, urls as string[]);
        }

        // 处理右侧热图
        const rightHeatMap: HeatMapImage = new Map();
        for (const [type, urls] of Object.entries(images.heatmaps.right)) {
          rightHeatMap.set(type, urls as string[]);
        }

        map.set('left', leftHeatMap);
        map.set('right', rightHeatMap);
        return map;
      })(),
      diseaseCategories:viewCaseStore.viewCase.aiCaseInfoJson.message.images.heatmaps.contains,
    }
    return obj;
  })

  return {
    imageInfo
  }
}