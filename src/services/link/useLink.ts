import { QUERY_KEYS } from '@/constants'
import { ILikeLink, ISpaceLink, IUpdateLink } from '@/models/link.model'
import { GetLinksReqBody } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../apiServices'

// 링크 조회 (페이지네이션 fetch 함수)
export const fetchGetLinks = async ({
  spaceId,
  pageNumber,
  pageSize,
  sort,
  tagId,
}: GetLinksReqBody) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    ...(sort && { sort: sort }),
    ...(tagId && { tagId: tagId.toString() }),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(
      `/api/space/${spaceId}/links?${queryString}`,
    )
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 링크 생성
export const usePostLink = (spaceId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: IUpdateLink['query']) => {
      const response = await apiClient.post(
        `/api/space/${spaceId}/links`,
        query,
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LINKS, spaceId] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TAGS, spaceId] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 링크 수정
export const usePutLink = (spaceId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: IUpdateLink['query']) => {
      const response = await apiClient.put(`/api/space/${spaceId}/links`, query)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LINKS, spaceId] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TAGS, spaceId] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 링크 삭제
export const useDeleteLink = ({
  spaceId,
  linkId,
}: {
  spaceId?: number
  linkId: number
}) => {
  const queryClient = useQueryClient()
  const params = {
    ...(spaceId && { spaceId: spaceId.toString() }),
    ...(linkId && { linkId: linkId.toString() }),
  }
  const queryString = new URLSearchParams(params).toString()
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete(
        `/api/space/${spaceId}/links?${queryString}`,
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LINKS, spaceId] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TAGS, spaceId] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 인기 링크 조회
export const useGetPopularLinks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.POPULAR_LINKS],
    queryFn: async () => {
      const response = await apiClient.get(`/api/links`)
      return response
    },
  })
}

// 인기 링크 조회 서버 함수
export const fetchGetPopularLinks = async () => {
  try {
    const response = await fetch(`/api/links`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 링크 좋아요
export const usePostLikeLink = () => {
  return useMutation({
    mutationFn: async (query: ILikeLink['query']) => {
      const response = await apiClient.post(
        `/api/links/${query.linkId}/like`,
        query,
      )
      return response
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 링크 좋아요 취소
export const useDeleteLikeLink = () => {
  return useMutation({
    mutationFn: async (query: ILikeLink['query']) => {
      const response = await apiClient.delete(`/api/links/${query.linkId}/like`)
      return response
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 링크 읽기 저장
export const usePostReadSaveLink = (spaceId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: ISpaceLink['query']) => {
      const response = await apiClient.post(
        `/api/space/${query.spaceId}/links/readInfo/${query.linkId}`,
        query,
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LINKS, spaceId] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
