import {
  FetchDeleteNotificationProps,
  fetchDeleteNotification,
} from '@/services/notification'
import { useQueryClient } from '@tanstack/react-query'

export interface UseDeleteNotificationProps {
  type: 'FOLLOW' | 'COMMENT' | 'INVITATION'
}

const useDeleteNotification = ({ type }: UseDeleteNotificationProps) => {
  const queryclient = useQueryClient()

  const handleDeleteNotification = async ({
    notificationId,
  }: FetchDeleteNotificationProps) => {
    await fetchDeleteNotification({ notificationId })
    await queryclient.invalidateQueries({ queryKey: ['notification', type] })
  }

  return { handleDeleteNotification }
}

export default useDeleteNotification
