import { apiClient } from '@/services/apiServices'
import { SearchSpaceReqBody } from '@/types'

const fetchGetMyFavoriteSpaces = async ({
  pageNumber,
  pageSize,
  keyWord,
  filter,
}: SearchSpaceReqBody) => {
  const path = '/api/user/favorites'
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    ...(keyWord && { keyWord: keyWord }),
    filter,
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetMyFavoriteSpaces }
