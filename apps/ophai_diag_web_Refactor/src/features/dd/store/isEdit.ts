import {ref} from "vue";

export const isEdit = ref<boolean>(false);
export const editType = ref<string>("");
export const editUrl = ref<string>("");
export const editedUrls = ref<Map<string,string>>(new Map<string,string>());