import { CommentReqBody } from '@/types'
import { apiClient } from '../apiServices'

const fetchGetComments = async ({
  spaceId,
  pageNumber,
  pageSize,
}: CommentReqBody) => {
  const path = `/api/space/${spaceId}/comments`
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

export { fetchGetComments }
