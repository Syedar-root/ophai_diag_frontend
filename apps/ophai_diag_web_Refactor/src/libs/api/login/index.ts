import request from '@/libs/utils/request'
import type { CustomAxiosRequestConfig } from '@/libs/utils/request'
// import axios from 'axios'
export const loginService = (query: any) => {
  return request({
    url: 'api/user/login',
    method: 'post',
    data: query,
    noToken: true
  } as CustomAxiosRequestConfig)

  // return axios.post('http://127.0.0.1:4523/m1/5970416-5658644-default/api/user/login', {
  //   data: query
  // })
}

export const registerService = (query: any):Promise<any> => {
  return request({
    url: 'api/user/register',
    method: 'post',
    data: query,
    noToken: true
  } as CustomAxiosRequestConfig)
}
