'use client'

import { cls } from '@/utils'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Button from '../Button/Button'
import { NOTIFICATION_MSG } from './constants'
import useNotification from './hooks/useNotification'

export interface NotificationProps {
  notificationId: number
  notificationType: 'FOLLOW' | 'COMMENT' | 'INVITATION'
  userId: number
  userName: string
  spaceId?: number
  spaceName?: string
  isRead?: boolean
  isAccepted?: boolean
  onAccept?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Notification = ({
  notificationId,
  notificationType,
  userId,
  userName,
  spaceId,
  spaceName,
  isRead = false,
  isAccepted = false,
  onAccept,
  onClose,
}: NotificationProps) => {
  const { handleClickUser, handleClickSpace, handleClickComment } =
    useNotification()

  return (
    <div
      className={cls(
        'flex flex-col gap-6 rounded-md border border-slate3 p-3',
        isRead || isAccepted ? 'bg-bgColor' : 'bg-emerald05',
      )}>
      <div className="flex w-full items-start justify-between text-sm font-medium text-gray9">
        <div>
          <span
            onClick={() => handleClickUser({ notificationId, userId, isRead })}
            className="cursor-pointer font-bold text-emerald6">
            {userName}
          </span>
          {NOTIFICATION_MSG.USER}
          {notificationType === 'FOLLOW' ? (
            NOTIFICATION_MSG.FOLLOW
          ) : (
            <>
              <span
                onClick={() =>
                  handleClickSpace({ notificationId, spaceId, isRead })
                }
                className="cursor-pointer font-bold text-emerald6">
                {spaceName}
              </span>
              {NOTIFICATION_MSG.TO}
              {notificationType === 'COMMENT' ? (
                <>
                  <span
                    onClick={() =>
                      handleClickComment({
                        notificationId,
                        spaceId,
                        isRead,
                      })
                    }
                    className="cursor-pointer font-bold text-emerald6">
                    {NOTIFICATION_MSG.COMMENT}
                  </span>
                  {NOTIFICATION_MSG.COMMENT_LEAVE}
                </>
              ) : (
                NOTIFICATION_MSG.SPACE_INVITE
              )}
            </>
          )}
        </div>
        <Button onClick={onClose}>
          <XMarkIcon className="h-5 w-5 p-0.5 text-slate6" />
        </Button>
      </div>
      {notificationType === 'INVITATION' && (
        <div className="flex justify-end">
          {isAccepted ? (
            <div className="text-sm font-semibold text-slate6">
              {NOTIFICATION_MSG.APPROVE}
            </div>
          ) : (
            <Button
              onClick={onAccept}
              className="button button-emerald px-2.5 py-1.5">
              {NOTIFICATION_MSG.APPROVE_BUTTON}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default Notification
