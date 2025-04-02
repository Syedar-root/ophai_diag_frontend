import request, { type CustomAxiosRequestConfig } from '@/libs/utils/request/index.ts'
import { type CaseListResponse } from '../types/index.ts'

export const getCaseListService = (query: any): Promise<any> => {
  const config: CustomAxiosRequestConfig = {
    url: '/api/case/list',
    method: 'get',
    params: query
  }
  return request(config)
}
