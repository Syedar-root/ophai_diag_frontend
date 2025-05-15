import { getNonAdmin } from '../api/index.ts'
import type {NonAdminQuery} from "@/features/ac/types.ts";
import {useNonAdminListStore} from "@/features/ac/store/nonAdminList.ts";
export const useSearchNonAdminList = () => {
  const searchNonAdminQuery = ref<NonAdminQuery>({
	pageNum:1,
	pageSize:10,
  })
  const nonAdminListStore = useNonAdminListStore();
  function handleSearchNonAdminList() {
	getNonAdmin(searchNonAdminQuery.value).then(response => {
	  nonAdminListStore.setNonAdminList(response.data)
	})
  }
  return {
	searchNonAdminQuery,
	handleSearchNonAdminList,
  }
}