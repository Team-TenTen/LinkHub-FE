import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = process.env.NEXT_PUBLIC_API_ADDRESS

// 댓글 조회
export const getComments = async ({
  spaceId,
  searchParams,
}: {
  spaceId: number | undefined
  searchParams: string
}) => {
  const token = Cookies.get('Auth-token')
  const response = await axios.get(
    `${baseURL}/spaces/${spaceId}/comments?${searchParams}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

// 댓글 생성
export const createComment = async ({
  spaceId,
  content,
}: {
  spaceId?: number
  content: string
}) => {
  const token = Cookies.get('Auth-token')
  const response = await axios.post(
    `${baseURL}/spaces/${spaceId}/comments`,
    { content },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response.data
}

// 댓글 수정
export const updateComment = async ({
  spaceId,
  commentId,
  content,
}: {
  spaceId?: number
  commentId?: number
  content: string
}) => {
  const token = Cookies.get('Auth-token')
  const response = await axios.put(
    `${baseURL}/spaces/${spaceId}/comments/${commentId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return response.data
}

// 댓글 삭제
export const deleteComment = async ({
  spaceId,
  commentId,
}: {
  spaceId: number | undefined
  commentId: number | undefined
}) => {
  const token = Cookies.get('Auth-token')
  const response = await axios.delete(
    `${baseURL}/spaces/${spaceId}/comments/${commentId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return response.data
}

// 대댓글 조회
export const getReplies = async ({
  spaceId,
  commentId,
  searchParams,
}: {
  spaceId: number | undefined
  commentId: number | undefined
  searchParams: string
}) => {
  const token = Cookies.get('Auth-token')
  const response = await axios.get(
    `${baseURL}/spaces/${spaceId}/comments/${commentId}/replies?${searchParams}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return response.data
}

// 대댓글 생성
export const createReply = async ({
  spaceId,
  commentId,
  content,
}: {
  spaceId: number
  commentId: number
  content: string
}) => {
  const token = Cookies.get('Auth-token')
  const response = await axios.post(
    `${baseURL}/spaces/${spaceId}/comments/${commentId}/replies`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return response.data
}
