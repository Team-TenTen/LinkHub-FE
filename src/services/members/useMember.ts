import {
  deleteFollow,
  getFollowers,
  getFollowing,
  getMemberProfile,
  getSearchMembers,
  postFollow,
  putMemberProfile,
} from '@/app/apis/member.api'
import { QUERY_KEYS } from '@/constants'
import { IFollow, IFollowList, IMemberSearch } from '@/models/member.model'
import { RegisterReqBody, SearchUserReqBody } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// 멤버 프로필 조회
export const useGetMemberProfile = (memberId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MEMBERS, memberId],
    queryFn: () => getMemberProfile({ memberId }),
    enabled: !!memberId,
  })
}

// 멤버 프로필 수정
export const usePutMemberProfile = (memberId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      memberId,
      data,
      file,
    }: {
      memberId: number
      data: RegisterReqBody
      file?: File
    }) => {
      const response = putMemberProfile({ memberId, data, file })
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
    const response = await getFollowing({ memberId, searchParams: queryString })
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
    const response = await getFollowers({ memberId, searchParams: queryString })
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 팔로우 추가
export const usePostFollow = (profileId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ memberId }: IFollow) => {
      const response = postFollow({ memberId })
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
      const response = deleteFollow({ memberId })
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
export const fetchSearchMembers = async ({
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
    const response = await getSearchMembers({
      searchParams: queryString,
    })
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}
