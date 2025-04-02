import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      userId:'' ,
      userName: "",
      hospital:"",
      gender:null,
      age:null,
    })

    // 测试
    // const user = ref(null)
    function getUser() {
      return user.value
    }

    function setUser(newUser: any) {
      user.value = newUser
    }

    function removeUser() {
      user.value = {
        userId:'' ,
        userName: "",
        hospital:"",
        gender:null,
        age:null,
      }
    }
    return { user, setUser, getUser , removeUser}
  },
  {
    persist: true
  }
)
