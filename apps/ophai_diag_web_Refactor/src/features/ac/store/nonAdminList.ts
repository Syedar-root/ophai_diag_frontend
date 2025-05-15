import {defineStore} from "pinia";
import type {NonAdminResponse} from "@/features/ac/types.ts";

export const useNonAdminListStore = defineStore('nonAdminList',()=>{
  const nonAdminList = ref<NonAdminResponse>({
	total: 0,
	items: []
  })
  const setNonAdminList = (newNonAdminList:NonAdminResponse) =>{
	nonAdminList.value = newNonAdminList
  }
  return {
	nonAdminList,
	setNonAdminList,
  }
});