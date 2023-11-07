import { NotificationSpaceProps } from './NotificationSpace'
import { NOTIFICATION_MSG } from './constants'
import useNotification from './hooks/useNotification'

const NotificationComment = ({
  notificationId,
  spaceId,
  isRead,
  spaceName,
}: NotificationSpaceProps) => {
  const { handleClickComment } = useNotification()
  return (
    <>
      <span
        onClick={() =>
          handleClickComment({
            notificationId,
            spaceId,
            isRead,
          })
        }
        className="cursor-pointer font-bold">
        {NOTIFICATION_MSG.COMMENT}
      </span>
      {NOTIFICATION_MSG.COMMENT_LEAVE}
    </>
  )
}

export default NotificationComment
