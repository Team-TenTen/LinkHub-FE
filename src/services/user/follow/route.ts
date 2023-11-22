import { apiClient } from '@/services/apiServices'

export interface FetchGetFollowingProps {
  memberId: number
  pageNumber: number
  pageSize: number
}

const fetchGetFollowing = async ({
  memberId,
  pageNumber,
  pageSize,
}: FetchGetFollowingProps) => {
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

export interface FetchGetFollowersProps extends FetchGetFollowingProps {}

const fetchGetFollowers = async ({
  memberId,
  pageNumber,
  pageSize,
}: FetchGetFollowersProps) => {
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

export {
  fetchGetFollowing,
  fetchGetFollowers,
  fetchFollowUser,
  fetchUnFollowUser,
}
