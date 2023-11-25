import { apiClient } from '@/services/apiServices'

export interface FetchGetUserProfileProps {
  memberId: number
}

const fetchGetUserProfile = async ({ memberId }: FetchGetUserProfileProps) => {
  const path = `/api/user/${memberId}/profile`

  try {
    const response = await apiClient.get(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetUserProfile }
