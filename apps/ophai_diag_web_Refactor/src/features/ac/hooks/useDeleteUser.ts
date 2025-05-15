import {deleteOther} from "@/features/ac/api";

export const useDeleteUser = () => {
  const deleteUserId = ref<string | null>(null);
  const handleDeleteUser = () => {
	if (!deleteUserId.value) return Promise.reject()
	return deleteOther(deleteUserId.value);
  }

  return {
	deleteUserId,
	handleDeleteUser,
  }
}