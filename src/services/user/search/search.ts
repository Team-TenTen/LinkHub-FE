import { apiClient } from '@/services/apiServices'
import { SearchUserReqBody } from '@/types'

const fetchSearchUsers = async ({
  pageNumber,
  pageSize,
  keyword,
}: SearchUserReqBody) => {
  const path = '/api/user/search'
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    keyword,
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchSearchUsers }
