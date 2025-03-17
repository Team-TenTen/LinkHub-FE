import { QUERY_KEYS } from '@/constants'
import {
  IChangeRole,
  ICreateSpace,
  ISpaceQuery,
  IUpdateSpace,
} from '@/models/space.model'
import { Tag } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../apiServices'

export interface FetchGetSpaceProps {
  spaceId?: number
}

// 스페이스 상세 조회
export const useGetSpace = (spaceId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SPACES, spaceId],
    queryFn: async () => await apiClient.get(`/api/space/${spaceId}`),
    enabled: !!spaceId,
  })
}

// 스페이스 생성
export const usePostSpace = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data, file }: ICreateSpace) => {
      const reqData = { ...data }
      const formData = new FormData()
      formData.append('request', JSON.stringify(reqData))
      file && formData.append('file', file)

      const response = await apiClient.post(
        `/api/spaces/create`,
        formData,
        {},
        {},
        'multipart',
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 스페이스 수정
export const usePatchSpace = (spaceId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ data, file }: IUpdateSpace) => {
      const reqData = { ...data }
      const formData = new FormData()
      formData.append('request', JSON.stringify(reqData))
      file && formData.append('file', file)

      const response = await apiClient.patch(
        `/api/space/${spaceId}`,
        formData,
        {},
        {},
        'multipart',
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES, spaceId] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 스페이스 삭제
export const useDeleteSpace = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: ISpaceQuery['query']) => {
      const response = await apiClient.delete(`/api/space/${query.spaceId}`)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 스페이스 즐겨찾기
export const usePostFavoriteSpace = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: ISpaceQuery['query']) => {
      const response = await apiClient.post(
        `/api/space/${query.spaceId}/favorites`,
        {},
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 스페이스 즐겨찾기 삭제
export const useDeleteFavoriteSpace = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: ISpaceQuery['query']) => {
      const response = await apiClient.delete(
        `/api/space/${query.spaceId}/favorites`,
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 태그 조회
export const useGetTags = ({ spaceId }: ISpaceQuery['query']) => {
  return useQuery<Tag[]>({
    queryKey: [QUERY_KEYS.TAGS, spaceId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/space/${spaceId}/tags`)
      return response.tags
    },
    enabled: !!spaceId,
  })
}

// 스페이스 권한 변경
export const usePatchRole = (spaceId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: IChangeRole['query']) => {
      const response = await apiClient.patch(
        `/api/space/${spaceId}/member/role`,
        query,
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES, spaceId] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 스페이스 가져오기
export const usePostScrapSpace = (spaceId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data, file }: IUpdateSpace) => {
      const reqData = { ...data }
      const formData = new FormData()
      formData.append('request', JSON.stringify(reqData))
      file && formData.append('file', file)
      const response = await apiClient.post(
        `/api/space/${spaceId}/scrap/new`,
        formData,
        {},
        {},
        'multipart',
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SPACES, spaceId] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
