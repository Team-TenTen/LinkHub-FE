import { NOTIFICATION_MSG } from './constants'
import useNotification from './hooks/useNotification'

export interface NotificationSpaceProps {
  notificationId: number
  spaceId?: number
  isRead: boolean
  spaceName?: string
}

const NotificationSpace = ({
  notificationId,
  spaceId,
  isRead,
  spaceName,
}: NotificationSpaceProps) => {
  const { handleClickSpace } = useNotification()
  return (
    <>
      <span
        onClick={() => handleClickSpace({ notificationId, spaceId, isRead })}
        className="cursor-pointer font-bold">
        {spaceName}
      </span>
      {NOTIFICATION_MSG.SPACE}
    </>
  )
}

export default NotificationSpace
