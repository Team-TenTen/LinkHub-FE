import { NOTIFICATION_MSG } from './constants'
import useNotification from './hooks/useNotification'

export interface NotificationUserProps {
  notificationId: number
  userId: number
  isRead: boolean
  userName: string
}

const NotificationUser = ({
  notificationId,
  userId,
  isRead,
  userName,
}: NotificationUserProps) => {
  const { handleClickUser } = useNotification()
  return (
    <>
      <span
        onClick={() => handleClickUser({ notificationId, userId, isRead })}
        className="cursor-pointer font-bold">
        {userName}
      </span>
      {NOTIFICATION_MSG.USER}
    </>
  )
}

export default NotificationUser
