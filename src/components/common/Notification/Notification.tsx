'use client'

import { cls } from '@/utils'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Button from '../Button/Button'
import NotificationComment from './NotificationComment'
import NotificationSpace from './NotificationSpace'
import NotificationUser from './NotificationUser'
import { NOTIFICATION_MSG } from './constants'
import useNotification from './hooks/useNotification'

export interface NotificationProps {
  notificationId: number
  type: 'follow' | 'comment' | 'space'
  userId: number
  userName: string
  spaceId?: number
  spaceName?: string
  isRead?: boolean
  isAccept?: boolean
  onAccept?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Notification = ({
  notificationId,
  type,
  userId,
  userName,
  spaceId,
  spaceName,
  isRead = false,
  isAccept = false,
  onAccept,
  onClose,
}: NotificationProps) => {
  const { handleClickUser, handleClickSpace, handleClickComment } =
    useNotification()

  return (
    <div
      className={cls(
        'flex flex-col gap-6 rounded-md border border-slate3 p-3',
        isRead ? 'bg-bgColor' : 'bg-emerald05',
      )}>
      <div className="flex w-full items-start justify-between text-sm font-medium text-gray9">
        <div>
          <NotificationUser
            notificationId={notificationId}
            userId={userId}
            isRead={isRead}
            userName={userName}
            onClickUser={handleClickUser}
          />
          {type === 'follow' ? (
            NOTIFICATION_MSG.FOLLOW
          ) : (
            <>
              <NotificationSpace
                notificationId={notificationId}
                spaceId={spaceId}
                isRead={isRead}
                spaceName={spaceName}
                onClickSpace={handleClickSpace}
              />
              {type === 'comment' && (
                <NotificationComment
                  notificationId={notificationId}
                  spaceId={spaceId}
                  isRead={isRead}
                  onClickComment={handleClickComment}
                />
              )}
              {type === 'space' && NOTIFICATION_MSG.SPACE_INVITE}
            </>
          )}
        </div>
        <Button onClick={onClose}>
          <XMarkIcon className="h-5 w-5 p-0.5 text-slate6" />
        </Button>
      </div>
      {type === 'space' && (
        <div className="flex justify-end">
          {isAccept ? (
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
