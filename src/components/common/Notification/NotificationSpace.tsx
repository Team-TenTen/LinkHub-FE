import { NOTIFICATION_MSG } from './constants'

export interface NotificationSpaceProps {
  notificationId: number
  spaceId?: number
  isRead: boolean
  spaceName?: string
  onClickSpace: ({
    notificationId,
    spaceId,
    isRead,
  }: {
    notificationId: number
    spaceId?: number
    isRead: boolean
  }) => void
}

const NotificationSpace = ({
  notificationId,
  spaceId,
  isRead,
  spaceName,
  onClickSpace,
}: NotificationSpaceProps) => {
  return (
    <>
      <span
        onClick={() => onClickSpace({ notificationId, spaceId, isRead })}
        className="cursor-pointer font-bold">
        {spaceName}
      </span>
      {NOTIFICATION_MSG.SPACE}
    </>
  )
}

export default NotificationSpace
