import { SearchSpaceReqBody, SpaceInviteResBody } from '@/types'
import { apiClient } from '../apiServices'

const fetchGetSpaces = async ({
  lastSpaceId,
  lastFavoriteCount,
  pageSize,
  sort,
  filter,
}: SearchSpaceReqBody) => {
  const path = '/api/spaces'
  const params = {
    pageSize: pageSize.toString(),
    ...(lastSpaceId !== undefined && { lastSpaceId: lastSpaceId.toString() }),
    ...(lastFavoriteCount !== undefined && {
      lastFavoriteCount: lastFavoriteCount.toString(),
    }),
    ...(sort && { sort: sort }),
    filter: filter,
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchSearchSpaces = async ({
  pageNumber = 0,
  pageSize,
  sort,
  filter,
  keyWord,
}: SearchSpaceReqBody) => {
  const path = '/api/spaces/search'
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    ...(sort && { sort: sort }),
    filter: filter,
    ...(keyWord && { keyWord: keyWord }),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchSearchMySpaces = async ({
  memberId,
  pageNumber = 0,
  pageSize,
  filter,
  keyWord,
}: SearchSpaceReqBody) => {
  const path = `/api/user/${memberId}/spaces`
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    filter: filter,
    ...(keyWord && { keyWord: keyWord }),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchAccetpSpaceInvitation = async (data: SpaceInviteResBody) => {
  const path = `/api/spaces/invitation`

  try {
    const response = await apiClient.post(path, data)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export {
  fetchGetSpaces,
  fetchSearchSpaces,
  fetchSearchMySpaces,
  fetchAccetpSpaceInvitation,
}
