import { QUERY_KEYS } from '@/constants'
import { ICommentQuery } from '@/models/comments.model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    const response = await fetch(
      `/api/space/${spaceId}/comments?${queryString}`,
      {
        method: 'GET',
      },
    )
    const data = await response.json()
    return data
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
      const response = await fetch(`/api/space/${spaceId}/comments/create`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      })
      const data = await response.json()
      return data
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
      const response = await fetch(
        `/api/space/${spaceId}/comments/${commentId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ content }),
        },
      )
      const data = await response.json()
      return data
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
      const response = await fetch(
        `/api/space/${spaceId}/comments/${commentId}`,
        {
          method: 'DELETE',
        },
      )
      const data = await response.json()
      return data
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
    const response = await fetch(
      `/api/space/${spaceId}/comments/${commentId}/replies?${queryString}`,
      {
        method: 'GET',
      },
    )
    const data = await response.json()
    return data
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
      const response = await fetch(
        `/api/space/${spaceId}/comments/${commentId}/replies`,
        {
          method: 'POST',
          body: JSON.stringify({ content }),
        },
      )
      const data = await response.json()
      return data
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
