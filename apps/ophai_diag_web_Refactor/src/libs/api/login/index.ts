import request from '@/libs/utils/request'
import type { CustomAxiosRequestConfig } from '@/libs/utils/request'
export const loginService = (query: any) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: query,
    noToken: true
  } as CustomAxiosRequestConfig)

}

export const registerService = (query: any):Promise<any> => {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: query,
    noToken: true
  } as CustomAxiosRequestConfig)
}
