import { CommentReqBody, CreateCommentReqBody } from '@/types'
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

const fetchCreateComment = async (
  spaceId: number,
  { content }: CreateCommentReqBody,
) => {
  const path = `/api/space/${spaceId}/comments/create`
  const body = { content }

  try {
    const response = await apiClient.post(path, body)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchDeleteComment = async (spaceId: number, commentId: number) => {
  const path = `/api/space/${spaceId}/comments/${commentId}`

  try {
    const response = await apiClient.delete(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetComments, fetchCreateComment, fetchDeleteComment }
