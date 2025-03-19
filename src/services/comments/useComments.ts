import { QUERY_KEYS } from '@/constants'
import { ICommentQuery } from '@/models/comments.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../apiServices'

// 댓글 조회 (페이지네이션 fetch 함수)
export const fetchGetComments = async ({
  spaceId,
  pageNumber,
  pageSize,
}: ICommentQuery) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(
      `/api/space/${spaceId}/comments?${queryString}`,
    )
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 댓글 생성
export const usePostComment = (spaceId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      spaceId,
      content,
    }: {
      spaceId: number
      content: string
    }) => {
      const response = await apiClient.post(
        `/api/space/${spaceId}/comments/create`,
        { content },
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMENTS, spaceId],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 댓글 수정
export const usePutComment = (spaceId?: number, parentCommentId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      spaceId,
      commentId,
      content,
    }: {
      spaceId: number
      commentId: number
      content: string
    }) => {
      const response = await apiClient.put(
        `/api/space/${spaceId}/comments/${commentId}`,
        { content },
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMENTS, spaceId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.REPLIES, spaceId, parentCommentId],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 댓글 삭제
export const useDeleteComment = (spaceId: number, parentCommentId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ commentId }: { commentId: number }) => {
      const response = await apiClient.delete(
        `/api/space/${spaceId}/comments/${commentId}`,
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMENTS, spaceId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.REPLIES, spaceId, parentCommentId],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 대댓글 조회 (무한스크롤 fetch 함수)
export const fetchGetReplies = async ({
  spaceId,
  commentId,
  pageNumber,
  pageSize,
}: ICommentQuery) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(
      `/api/space/${spaceId}/comments/${commentId}/replies?${queryString}`,
    )
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 대댓글 생성
export const usePostReply = (spaceId: number, parentCommentId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      spaceId,
      commentId,
      content,
    }: {
      spaceId: number
      commentId: number
      content: string
    }) => {
      const response = await apiClient.post(
        `/api/space/${spaceId}/comments/${commentId}/replies`,
        { content },
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMENTS, spaceId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.REPLIES, spaceId],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
