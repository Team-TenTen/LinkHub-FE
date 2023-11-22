import { apiClient } from '@/services/apiServices'

export interface FetchFollowUserProps {
  memberId: number
}

const fetchFollowUser = async ({ memberId }: FetchFollowUserProps) => {
  const path = `/api/user/follow`
  const params = {
    memberId: memberId.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.post(`${path}?${queryString}`, {})
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchUnFollowUser = async ({ memberId }: FetchFollowUserProps) => {
  const path = `/api/user/follow`
  const params = {
    memberId: memberId.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.delete(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchFollowUser, fetchUnFollowUser }
