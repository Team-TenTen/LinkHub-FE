import { apiClient } from '@/services/apiServices'

const fetchGetUserProfile = async ({ userId }: { userId: number }) => {
  const path = `/api/user/profile/${userId}`

  try {
    const response = await apiClient.get(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetUserProfile }
