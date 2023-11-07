import { NOTIFICATION_MSG } from './constants'
import { HandleClickCommentProps } from './hooks/useNotification'

export interface NotificationCommentProps {
  notificationId: number
  spaceId?: number
  isRead: boolean
  onClickComment: ({
    notificationId,
    spaceId,
    isRead,
  }: HandleClickCommentProps) => void
}

const NotificationComment = ({
  notificationId,
  spaceId,
  isRead,
  onClickComment,
}: NotificationCommentProps) => {
  return (
    <>
      <span
        onClick={() =>
          onClickComment({
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
