import type {UpdatePermissionQuery} from "@/features/ac/types.ts";
import {upDatePermission} from "@/features/ac/api";
import {useSearchNonAdminList} from "@/features/ac/hooks/useSearchNonAdminList.ts";
import {ElMessage} from "element-plus";

export const useUpdatePermission = () =>{
  const updateQuery = ref<UpdatePermissionQuery>({
	userId:"",
	permission: 0,
  });
  function handleUpdatePermission() {
	if (!updateQuery.value) return;
	upDatePermission(updateQuery.value).then(()=>{
	  const { handleSearchNonAdminList } = useSearchNonAdminList()
	  handleSearchNonAdminList();
	  ElMessage.success("修改成功")
	});
  }

  return {
	updateQuery,
	handleUpdatePermission,
  }
}