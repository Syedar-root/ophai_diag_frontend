import {exportImageLibrary, exportImageLibraryExcel} from "@/features/imageLibrary/api";
import {searchImageLibQuery} from "@/features/imageLibrary/hooks/useSearchImage.ts";
import {type Ref} from "vue";
export const loading = ref(false);

export const useExportImage = ( downLoadText:Ref<string> ) => {
  if(!searchImageLibQuery.value) return;
  loading.value = true;
  return exportImageLibrary(searchImageLibQuery.value).then((res) => {
	const link = document.createElement('a');
	link.href = res.data;
	link.setAttribute('download',  'file');
	// 触发下载
	link.click();
	downLoadText.value = "正在下载..."
	window.URL.revokeObjectURL(res.data);
	ElMessage.success("图片数据下载成功！");
  }).catch(err=>{
	console.error(err);
	ElMessage.error("下载失败："+err.message);
  }).finally(()=>{
	loading.value = false;
	downLoadText.value = "下载当页图片";
  })
}

export const useExportImageExcel = () => {
  if(!searchImageLibQuery.value) return;
  exportImageLibraryExcel(searchImageLibQuery.value).then((res) => {
	const link = document.createElement('a');
	link.href = res.data;
	link.setAttribute('download',  'file');
	link.click();
	window.URL.revokeObjectURL(res.data);
  }).catch((err) => {
	console.log(err);
  }).finally(()=>{
  })
}