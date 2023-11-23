import { SearchMySpaceReqBody, SearchSpaceReqBody } from '@/types'
import { apiClient } from '../apiServices'

const fetchGetSpaces = async ({
  pageNumber,
  pageSize,
  sort,
  filter,
}: SearchSpaceReqBody) => {
  const path = '/api/spaces'
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    sort: sort,
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
  pageNumber,
  pageSize,
  sort,
  filter,
  keyWord,
}: SearchSpaceReqBody) => {
  const path = '/api/spaces/search'
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    sort: sort,
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

const fetchSearchMySpaces = async (
  memberId: number,
  { pageNumber, pageSize, filter, keyWord }: SearchMySpaceReqBody,
) => {
  const path = `/api/spaces/searchMySpace/${memberId}`
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

export { fetchGetSpaces, fetchSearchSpaces, fetchSearchMySpaces }
