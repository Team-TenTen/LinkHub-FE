import {
  createSpace,
  deleteFavoriteSpace,
  deleteSpace,
  getSpace,
  getTags,
  patchRole,
  patchSpace,
  postFavoriteSpace,
  postScrapSpace,
} from '@/app/apis/space.api'
import { QUERY_KEYS } from '@/constants'
import {
  IChangeRole,
  ICreateSpace,
  ISpaceQuery,
  IUpdateSpace,
} from '@/models/space.model'
import { Tag } from '@/types'
import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import Cookies from 'js-cookie'

export interface FetchGetSpaceProps {
  spaceId?: number
}

// 스페이스 상세 조회
export const useGetSpace = (spaceId?: number) => {
  const token = Cookies.get('Auth-token')
  return useQuery({
    queryKey: [QUERY_KEYS.SPACES, spaceId],
    queryFn: () => getSpace({ spaceId }),
    enabled: !!spaceId && !!token,
  })
}

// 스페이스 생성
export const usePostSpace = (): UseMutationResult<
  { spaceId: number },
  Error,
  ICreateSpace
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, file }: ICreateSpace) => {
      const response = createSpace({ data, file })
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
      const response = patchSpace({ spaceId, data, file })
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
    mutationFn: (query: ISpaceQuery['query']) => deleteSpace({ query }),
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
    mutationFn: (query: ISpaceQuery['query']) => postFavoriteSpace({ query }),
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
    mutationFn: (query: ISpaceQuery['query']) => deleteFavoriteSpace({ query }),
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
      const response = await getTags({ spaceId })
      return response.tags
    },
    enabled: !!spaceId,
  })
}

// 스페이스 권한 변경
export const usePatchRole = (spaceId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (query: IChangeRole['query']) => patchRole({ query }),
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
      const response = postScrapSpace({ spaceId, data, file })
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
