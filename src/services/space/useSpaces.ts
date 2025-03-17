import { PAGE_SIZE, QUERY_KEYS } from '@/constants'
import {
  IAcceptSpaceInvitation,
  IInviteSpace,
  ISearchSpace,
} from '@/models/space.model'
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { apiClient } from '../apiServices'

// 전체 스페이스 필터 조회 (무한스크롤 fetch 함수)
export const fetchGetSpaces = async ({
  lastSpaceId = undefined,
  lastFavoriteCount = undefined,
  pageSize = PAGE_SIZE,
  sort = 'created_at',
  filter = 'all',
}: ISearchSpace['query']) => {
  const params = {
    pageSize: pageSize.toString(),
    ...(lastSpaceId !== undefined && { lastSpaceId: lastSpaceId.toString() }),
    ...(lastFavoriteCount !== undefined && {
      lastFavoriteCount: lastFavoriteCount.toString(),
    }),
    ...(sort && { sort: sort }),
    filter: filter,
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`/api/spaces?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 스페이스 검색 (무한스크롤 fetch 함수)
export const fetchSearchSpaces = async ({
  pageNumber = 0,
  pageSize,
  sort,
  filter,
  keyWord,
}: ISearchSpace['query']) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    ...(sort && { sort: sort }),
    filter: filter,
    ...(keyWord && { keyWord: keyWord }),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`/api/spaces/search?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 내 스페이스 검색 (무한스크롤 fetch 함수)
export const fetchSearchMySpaces = async ({
  memberId,
  pageNumber = 0,
  pageSize,
  filter,
  keyWord,
}: ISearchSpace['query']) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    filter: filter,
    ...(keyWord && { keyWord: keyWord }),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(
      `/api/user/${memberId}/spaces?${queryString}`,
    )
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 내 즐겨찾기 스페이스 검색 (무한스크롤 fetch 함수)
export const fetchGetMyFavoriteSpaces = async ({
  pageNumber = 0,
  pageSize,
  filter,
  keyWord,
}: ISearchSpace['query']) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    ...(keyWord && { keyWord: keyWord }),
    filter,
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`/api/user/favorites?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 스페이스 초대
export const usePostInviteSpace = (): UseMutationResult<
  IInviteSpace['response'],
  Error,
  IInviteSpace['query']
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: IInviteSpace['query']) => {
      const response = await apiClient.post(`/api/space/invitations`, query)
      return response
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPACES, data.spaceId],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 스페이스 초대 수락
export const usePostAccetpSpaceInvitation = (): UseMutationResult<
  { spaceId: number },
  Error,
  IAcceptSpaceInvitation['query']
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: IAcceptSpaceInvitation['query']) => {
      const response = await apiClient.post(`/api/spaces/invitations`, query)
      return response
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATION_COUNT],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INVITATIONS],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
