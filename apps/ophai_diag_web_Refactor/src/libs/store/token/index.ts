import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref<string>('')
    const expire = ref(new Date()) // 修改类型定义
    const showLogin = ref<boolean>(false)

    function setToken(newToken: string) {
      token.value = newToken
      expire.value = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    }

    function toggleLogin(show: boolean) {
      showLogin.value = show;
    } // 新增 toggleLogin 方法，用于切换登录状态

    function isTokenExpired() {
      const expiryDate = new Date(expire.value)
      console.log(typeof expiryDate) // 强制转换为 Date
      return expiryDate.getTime() < Date.now()
    }
    return { token, expire, setToken, isTokenExpired, showLogin, toggleLogin }
  },
  {
    persist: true
  }
)
