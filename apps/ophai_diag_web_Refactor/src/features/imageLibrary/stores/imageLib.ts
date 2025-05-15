import {defineStore} from "pinia";
import type { ImageLibraryResponse} from "@/features/imageLibrary/types.ts";

export const useImageLibraryStore = defineStore('imageLibrary', ()=>{
  const imageLibrary = ref<ImageLibraryResponse>({
	total: 0,
	items: [],
  })
  const setImageLibrary = (newImageLibrary:ImageLibraryResponse) => {
	imageLibrary.value = newImageLibrary;
  }

  return {
  	imageLibrary,
  	setImageLibrary,
  }
})