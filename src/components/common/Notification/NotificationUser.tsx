import { NOTIFICATION_MSG } from './constants'

export interface NotificationUserProps {
  notificationId: number
  userId: number
  isRead: boolean
  userName: string
  onClickUser: ({
    notificationId,
    userId,
    isRead,
  }: {
    notificationId: number
    userId: number
    isRead: boolean
  }) => void
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
