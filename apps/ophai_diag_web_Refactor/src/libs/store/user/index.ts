import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Permission } from "@/shared/components/business/login/types.ts";

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      userId:'' ,
      userName: "",
      hospital:"",
      gender:null,
      age:null,
      permission: Permission.ADMIN as Permission
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
        permission: Permission.PATIENT as Permission
      }
    }
    return { user, setUser, getUser , removeUser}
  },
  {
    persist: true
  }
)
