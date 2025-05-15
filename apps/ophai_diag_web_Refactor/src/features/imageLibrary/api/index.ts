import request from '@/libs/utils/request'
import type { CustomAxiosRequestConfig,ResponseData } from '@/libs/utils/request'
import type {ImageLibraryQuery, ImageLibraryResponse} from "@/features/imageLibrary/types.ts";

export const getImageLibrary = (query: ImageLibraryQuery):Promise<ResponseData<ImageLibraryResponse>> => {
  return request({
	url: '/api/preImage/list',
	method: 'get',
	params: query,
  } as CustomAxiosRequestConfig)
}

export const exportImageLibrary = (query: ImageLibraryQuery):Promise<any> => {
  return request({
	url: '/api/preImage/batchExportImage',
	method: 'post',
	params: query,
	timeout:Infinity
  } as CustomAxiosRequestConfig)
}

export const exportImageLibraryExcel = (query: ImageLibraryQuery):Promise<ResponseData> => {
  return request({
	url: '/api/preImage/exportExcel',
	method: 'post',
	params: query,
	timeout:Infinity
  } as CustomAxiosRequestConfig)
}