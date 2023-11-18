import { SearchSpaceReqBody } from '@/types'
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

export { fetchGetSpaces }
