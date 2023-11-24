import { apiClient } from '@/services/apiServices'

export interface FetchGetFollowProps {
  memberId?: number
  pageNumber: number
  pageSize: number
}

const fetchGetFollowing = async ({
  memberId,
  pageNumber,
  pageSize,
}: FetchGetFollowProps) => {
  const path = `/api/user/${memberId}/following`
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchGetFollowers = async ({
  memberId,
  pageNumber,
  pageSize,
}: FetchGetFollowProps) => {
  const path = `/api/user/${memberId}/followers`
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export interface FetchFollowUserProps {
  memberId: number
}

const fetchFollowUser = async ({ memberId }: FetchFollowUserProps) => {
  const path = `/api/user/${memberId}/follow`

  try {
    const response = await apiClient.post(path, {})
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchUnFollowUser = async ({ memberId }: FetchFollowUserProps) => {
  const path = `/api/user/${memberId}/follow`

  try {
    const response = await apiClient.delete(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export {
  fetchGetFollowing,
  fetchGetFollowers,
  fetchFollowUser,
  fetchUnFollowUser,
}
