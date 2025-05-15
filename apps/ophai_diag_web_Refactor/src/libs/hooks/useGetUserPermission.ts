import { useUserStore } from '@/libs/store/user'

export const useGetUserPermission = () => {
  const userStore = useUserStore()
  const user = userStore.getUser()
  return user?.permission
}