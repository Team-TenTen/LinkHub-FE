import {
  createLink,
  deleteLikeLink,
  deleteLink,
  getLinks,
  getPopularLinks,
  postLikeLink,
  postReadSaveLink,
  updateLink,
} from '@/app/apis/link.api'
import { QUERY_KEYS } from '@/constants'
import { ILikeLink, ISpaceLink, IUpdateLink } from '@/models/link.model'
import { GetLinksReqBody } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
    const response = await getLinks({ spaceId, searchParams: queryString })
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 링크 생성
export const usePostLink = (spaceId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (query: IUpdateLink['query']) => createLink({ query }),
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
    mutationFn: (query: IUpdateLink['query']) => updateLink({ query }),
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
export const useDeleteLink = (spaceId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (query: ISpaceLink['query']) => deleteLink({ query }),
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
    queryFn: () => getPopularLinks(),
  })
}

// 링크 좋아요
export const usePostLikeLink = () => {
  return useMutation({
    mutationFn: (query: ILikeLink['query']) => postLikeLink({ query }),
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 링크 좋아요 취소
export const useDeleteLikeLink = () => {
  return useMutation({
    mutationFn: (query: ILikeLink['query']) => deleteLikeLink({ query }),
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 링크 읽기 저장
export const usePostReadSaveLink = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (query: ISpaceLink['query']) => postReadSaveLink({ query }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LINKS] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
