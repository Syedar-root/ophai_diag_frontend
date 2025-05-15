import {ref} from "vue";
import type {ImageLibraryQuery} from "@/features/imageLibrary/types.ts";
import {getImageLibrary} from "@/features/imageLibrary/api";
import {useImageLibraryStore} from "@/features/imageLibrary/stores/imageLib.ts";

export const searchImageLibQuery = ref<ImageLibraryQuery>({
  pageNum: 1,
  pageSize: 100,
  diseaseName: "全部",
  gender: -1,
  StartAge: undefined,
  EndAge: undefined,
  startDate: undefined,
  endDate: undefined,
  diagStatus: -1,
})
const imageLibStore = useImageLibraryStore();
export const handleSearchImage = () => {
	if(!searchImageLibQuery.value) return;
	getImageLibrary(searchImageLibQuery.value).then((res) => {
	  imageLibStore.setImageLibrary(res.data);
	  ElMessage.success('查询成功');
	}).catch((err) => {
	  console.log(err);
	})
}