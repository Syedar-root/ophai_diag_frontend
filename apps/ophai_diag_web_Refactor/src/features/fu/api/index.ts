import request from '@/libs/utils/request'
import type { CustomAxiosRequestConfig,ResponseData } from '@/libs/utils/request'

export const uploadCaseService = (query: any):Promise<ResponseData> => {
  return request({
    url: '/api/preImage/saveAndProcess',
    method: 'post',
    data: query,
    // noToken: true,
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
  } as CustomAxiosRequestConfig)
}
