import request, { type CustomAxiosRequestConfig,type ResponseData } from '@/libs/utils/request/index.ts'
import type {AddOtherQuery, NonAdminQuery, NonAdminResponse, UpdatePermissionQuery} from '../types.ts'

export const getNonAdmin = (query: NonAdminQuery): Promise<ResponseData<NonAdminResponse>> => {
  const config: CustomAxiosRequestConfig = {
	url: '/api/user/get/non-admin',
	method: 'get',
	params: query
  }
  return request(config)
}

export const addOther = (query: AddOtherQuery): Promise<ResponseData> => {
  const config: CustomAxiosRequestConfig = {
	url: '/api/user/otherRegister',
	method: 'post',
	data: query
  }
  return request(config)
}

export const upDatePermission = (query: UpdatePermissionQuery): Promise<ResponseData> => {
  const config: CustomAxiosRequestConfig = {
	url: '/api/user/permission',
	method: 'put',
	params: query
  }
  return request(config)
}

export const deleteOther = (query :string) => {
  const config: CustomAxiosRequestConfig = {
	url: '/api/user/delete/' + query,
	method: 'delete'
  }
  return request(config)
}