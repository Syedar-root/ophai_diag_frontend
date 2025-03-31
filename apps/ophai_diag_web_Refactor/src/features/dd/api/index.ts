import request from '@/libs/utils/request'

export const getCaseService = (query: any): Promise<any> => {
  return request({
    url: '/api/case/simple/' + query,
    method: 'get'
  })
}

export const updateCaseService = (query: any): Promise<any> => {
  return request({
    url: '/api/case/update',
    method: 'post',
    data: query
  })
}