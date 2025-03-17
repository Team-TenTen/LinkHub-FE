import { useDeleteNotifications } from '@/services/notification/useNotification'

export interface FetchDeleteNotificationProps {
  notificationId: number
}

const useDeleteNotification = () => {
  const { mutate: deleteNotification } = useDeleteNotifications()

  const handleDeleteNotification = async ({
    notificationId,
  }: FetchDeleteNotificationProps) => {
    deleteNotification(notificationId)
  }

  return { handleDeleteNotification }
}

export default useDeleteNotification
