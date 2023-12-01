import { apiClient } from '../apiServices'

export interface FetchDeleteNotificationProps {
  notificationId: number
}

const fetchDeleteNotification = async ({
  notificationId,
}: FetchDeleteNotificationProps) => {
  const path = `/api/notification/${notificationId}`

  try {
    const response = await apiClient.delete(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchDeleteNotification }
