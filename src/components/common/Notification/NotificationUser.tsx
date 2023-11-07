import { NOTIFICATION_MSG } from './constants'
import { HandleClickUserProps } from './hooks/useNotification'

export interface NotificationUserProps {
  notificationId: number
  userId: number
  isRead: boolean
  userName: string
  onClickUser: ({
    notificationId,
    userId,
    isRead,
  }: HandleClickUserProps) => void
}

const NotificationUser = ({
  notificationId,
  userId,
  isRead,
  userName,
  onClickUser,
}: NotificationUserProps) => {
  return (
    <>
      <span
        onClick={() => onClickUser({ notificationId, userId, isRead })}
        className="cursor-pointer font-bold">
        {userName}
      </span>
      {NOTIFICATION_MSG.USER}
    </>
  )
}

export default NotificationUser
