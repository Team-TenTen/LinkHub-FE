'use client'

import { cls } from '@/utils'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Button from '../Button/Button'
import { NOTIFICATION_MSG } from './constants'

export interface NotificationProps {
  type: 'follow' | 'comment' | 'space'
  userName: string
  spaceName?: string
  isRead?: boolean
  isAccept?: boolean
  onAccept?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Notification = ({
  type,
  userName,
  spaceName,
  isRead = false,
  isAccept = false,
  onAccept,
  onClose,
}: NotificationProps) => {
  return (
    <div
      className={cls(
        'rounded-md border border-slate3 p-3',
        isRead ? 'bg-bgColor' : 'bg-emerald05',
      )}>
      <div className="flex w-full items-center justify-between text-sm font-medium text-gray9">
        {type === 'follow' && (
          <div>
            <span className="font-bold">{userName}</span>
            {NOTIFICATION_MSG.FOLLOW}
          </div>
        )}
        {type === 'comment' && (
          <div>
            <span className="font-bold">{userName}</span>
            {NOTIFICATION_MSG.USER}
            <span className="font-bold">{spaceName}</span>
            {NOTIFICATION_MSG.COMMENT}
          </div>
        )}
        {type === 'space' && (
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold">{userName}</span>
                {NOTIFICATION_MSG.USER}
                <span className="font-bold">{spaceName}</span>
                {NOTIFICATION_MSG.SPACE}
              </div>
              <Button onClick={onClose}>
                <XMarkIcon className="h-5 w-5 p-0.5 text-slate6" />
              </Button>
            </div>
            <div className="flex justify-end">
              {isAccept ? (
                <div className="text-sm font-semibold text-slate6">
                  {NOTIFICATION_MSG.APPROVE}
                </div>
              ) : (
                <Button
                  className="button button-emerald px-2.5 py-1.5"
                  onClick={onAccept}>
                  {NOTIFICATION_MSG.APPROVE_BUTTON}
                </Button>
              )}
            </div>
          </div>
        )}
        {type !== 'space' && 'comment' && (
          <Button onClick={onClose}>
            <XMarkIcon className="h-5 w-5 p-0.5 text-slate6" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Notification
