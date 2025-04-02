import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref<string>('')
    const showLogin = ref<boolean>(false)

    function setToken(newToken: string) {
      token.value = newToken
    }
    function removeToken() {
      token.value = ''
    }

    function toggleLogin(show: boolean) {
      showLogin.value = show;
    }
    return { token, setToken,removeToken, showLogin, toggleLogin }
  },
  {
    persist: true
  }
)
