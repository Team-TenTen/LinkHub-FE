import { QUERY_KEYS } from '@/constants'
import { IFollow, IFollowList, IMemberSearch } from '@/models/member.model'
import { RegisterReqBody } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../apiServices'

// 멤버 프로필 조회
export const useGetUserProfile = (memberId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MEMBERS, memberId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/user/${memberId}/profile`)
      return response
    },
    enabled: !!memberId,
  })
}

// 멤버 프로필 조회 서버 함수
export const fetchGetUserProfile = async ({
  memberId,
}: {
  memberId?: number
}) => {
  try {
    const response = await apiClient.get(`/api/user/${memberId}/profile`, {
      cache: 'no-store',
    })
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 멤버 프로필 수정
export const usePutUserProfile = (memberId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      memberId,
      data,
      file,
    }: {
      memberId: number
      data: RegisterReqBody
      file?: File
    }) => {
      const formData = new FormData()
      formData.append('request', JSON.stringify(data))
      if (file) {
        formData.append('file', file)
      }

      const response = await apiClient.put(
        `/api/user/${memberId}/profile`,
        formData,
        {},
        {},
        'multipart',
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MEMBERS, memberId],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
export const fetchPostUserProfile = async (
  userId: number,
  data: RegisterReqBody,
  file?: File,
) => {
  const path = `/api/user/${userId}/profile`
  const reqData = { ...data }
  const formData = new FormData()
  formData.append('request', JSON.stringify(reqData))
  file && formData.append('file', file)

  try {
    const response = await apiClient.put(path, formData, {}, {}, 'multipart')
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 팔로잉 목록 조회 (페이지네이션 fetch 함수)
export const fetchGetFollowing = async ({
  memberId,
  pageNumber,
  pageSize,
}: IFollowList) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(
      `/api/user/${memberId}/following?${queryString}`,
    )
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 팔로워 목록 조회 (페이지네이션 fetch 함수)
export const fetchGetFollowers = async ({
  memberId,
  pageNumber,
  pageSize,
}: IFollowList) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(
      `/api/user/${memberId}/followers?${queryString}`,
    )
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 팔로우 추가
export const usePostFollow = (profileId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ memberId }: IFollow) => {
      const response = await apiClient.post(`/api/user/${memberId}/follow`, {})
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MEMBERS, profileId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOLLOWING, profileId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOLLOWERS, profileId],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 팔로우 삭제
export const useDeleteFollow = (profileId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ memberId }: IFollow) => {
      const response = await apiClient.delete(`/api/user/${memberId}/follow`)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MEMBERS, profileId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOLLOWING, profileId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOLLOWERS, profileId],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 멤버 검색 (무한스크롤 fetch 함수)
export const fetchSearchUsers = async ({
  pageNumber,
  pageSize,
  keyword,
}: IMemberSearch) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    keyword,
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`/api/user/search?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}
