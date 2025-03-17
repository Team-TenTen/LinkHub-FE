import { QUERY_KEYS } from '@/constants'
import { IInvitationsQuery } from '@/models/notification.model'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../apiServices'

// 미확인 알림 개수 조회
export const useGetUnCheckedNotifications = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_COUNT],
    queryFn: async () => {
      const response = await apiClient.get(`/api/notification/unchecked`)
      return response
    },
  })
}

// 초대 알림 조회
export const fetchGetInvitations = async ({
  pageNumber,
  pageSize,
}: IInvitationsQuery['query']) => {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(
      `/api/notification/invitations?${queryString}`,
    )
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

// 알림 삭제
export const useDeleteNotifications = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const response = await apiClient.delete(
        `/api/notification/${notificationId}`,
      )
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVITATIONS] })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATION_COUNT],
      })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
