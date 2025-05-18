import type {AddOtherQuery} from "@/features/ac/types.ts";
import {addOther} from "@/features/ac/api";
import {useSearchNonAdminList} from "@/features/ac/hooks/useSearchNonAdminList.ts";
import {ElMessage} from "element-plus";

export const useAddOtherUser = () => {
  const addOtherUserQuery = ref<AddOtherQuery>({
	age: 0,
	email: "",
	gender: -1,
	idNumber: "",
	passwordHash: "",
	permission: 3,
	phone: "",
	position: "",
	userName: "",
  });

  async function handleAddOtherUser() {
	if (!addOtherUserQuery.value) return  Promise.reject("请输入用户信息");
	return addOther(addOtherUserQuery.value).then(()=>{
	  const { handleSearchNonAdminList } = useSearchNonAdminList()
	  handleSearchNonAdminList();
	  ElMessage.success("添加成功")
	})
  }

  return {
	addOtherUserQuery,
	handleAddOtherUser,
  }
}