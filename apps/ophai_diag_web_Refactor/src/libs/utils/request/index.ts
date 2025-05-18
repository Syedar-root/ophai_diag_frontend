import axios, {
  type AxiosResponse,
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosHeaders
} from 'axios'
import { ElMessage } from 'element-plus'
import {useTokenStore} from "@/libs/store/token";

// 定义基础响应类型
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

// 修改类型定义
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  noToken?: boolean
  headers?: AxiosHeaders | Record<string, string | number | boolean>,
  timeout?: number,
}
// 请求拦截器
request.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 在这里可以添加请求头、认证信息等
    const tokenStore = useTokenStore();
    config.headers = config.headers || {}
    if (!config.noToken) {
      const token: string = tokenStore.token;
      if (token) {
        config.headers.Authorization = `${token}`
      }
    }
    if (config.method === 'get') {
      config.params = config.params || {}
      // config.params.t = Date.now();
    } else if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.data = config.data || {}
    }
    console.log('请求配置：', config)
    return config as InternalAxiosRequestConfig
  },
  (error: AxiosError) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    console.log(response.headers)
    if (response.headers['content-type'].includes('application/zip')) {
      // 处理二进制文件响应
      const blob = new Blob([response.data], { type: 'application/zip' })
      const url = window.URL.createObjectURL(blob)
      return Promise.resolve(url)
    }
    // 在这里可以对响应数据进行处理
    if (response.data.code !== 200) {
      ElMessage({
        message: response.data.message,
        type: 'error',
        duration: 2000
      })
      if (response.data.code === 401) {
        // 处理未登录或登录过期的情况
        const tokenStore = useTokenStore();
        tokenStore.removeToken()
        tokenStore.toggleLogin(true)
      }
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error: AxiosError<ResponseData>) => {
    if (error.response) {
      console.error(`请求错误：状态码 ${error.response.status}`)
    }
    return Promise.reject(error.response?.data || error)
  }
)

export default request
