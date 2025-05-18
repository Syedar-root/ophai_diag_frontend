import {defineStore} from "pinia";

export const useTempIdStore = defineStore("tempId", ()=>{
  const tempId = ref<string>("");

  function setTempId(newTempId:string){
	tempId.value = newTempId;
  }
  return {
	tempId,
	setTempId,
  }
});