import { QUERY_KEYS } from '@/constants'
import { IFollow, IFollowList, IMemberSearch } from '@/models/member.model'
import { RegisterReqBody } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const baseURL = process.env.NEXT_PUBLIC_API_INTERNAL_ADDRESS

// 멤버 프로필 조회
export const useGetUserProfile = (memberId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MEMBERS, memberId],
    queryFn: async () => {
      const response = await fetch(`/api/user/${memberId}/profile`)
      const data = await response.json()
      return data
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
  const path = `${baseURL}/api/user/${memberId}/profile`

  try {
    const response = await fetch(path, { cache: 'no-store' })
    return response.json()
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

      const response = await fetch(`/api/user/${memberId}/profile`, {
        method: 'PUT',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      return await response.json()
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
    const response = await fetch(
      `/api/user/${memberId}/following?${queryString}`,
    )
    return response.json()
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
    const response = await fetch(
      `/api/user/${memberId}/followers?${queryString}`,
    )
    return response.json()
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 팔로우 추가
export const usePostFollow = (profileId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ memberId }: IFollow) => {
      const response = fetch(`/api/user/${memberId}/follow`, {
        method: 'POST',
      })
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
    mutationFn: ({ memberId }: IFollow) => {
      const response = fetch(`/api/user/${memberId}/follow`, {
        method: 'DELETE',
      })
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
    const response = await fetch(`/api/user/search?${queryString}`)
    const data = await response.json()
    return data
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}
