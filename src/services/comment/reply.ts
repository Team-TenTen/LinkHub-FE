import { CommentReqBody } from '@/types'
import { apiClient } from '../apiServices'

const fetchGetReplies = async ({
  spaceId,
  commentId,
  pageNumber,
  pageSize,
}: CommentReqBody) => {
  const path = `/api/space/${spaceId}/comments/${commentId}/replies`
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

export { fetchGetReplies }
