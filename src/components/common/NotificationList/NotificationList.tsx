'use client'

import { Fragment } from 'react'
import { Spinner } from '@/components'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { InvitationsNotification, InvitationsReqBody } from '@/types'
import Notification from '../Notification/Notification'
import { NONE_NOTIFICATION_RESULT } from './constants'
import useAcceptNotification from './hooks/useAcceptNotification'
import useDeleteNotification from './hooks/useDeleteNotification'
import useNotificationQuery from './hooks/useNotificationQuery'

export interface NotificationListProps {
  fetchFn: ({ pageNumber, pageSize }: InvitationsReqBody) => Promise<any>
  type: 'FOLLOW' | 'COMMENT' | 'INVITATION'
}

const NotificationList = ({ fetchFn, type }: NotificationListProps) => {
  const {
    notificationList,
    fetchNextPage,
    hasNextPage,
    isNotificationLoading,
  } = useNotificationQuery({
    fetchFn,
    type,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })
  const { handleAcceptInvite } = useAcceptNotification({ type })
  const { handleDeleteNotification } = useDeleteNotification({ type })

  return isNotificationLoading ? (
    <Spinner />
  ) : (
    <ul className="flex flex-col gap-y-2">
      {notificationList?.pages[0].responses.length > 0 ? (
        notificationList?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.responses?.map((notification: InvitationsNotification) => (
              <li key={notification.notificationId}>
                <Notification
                  notificationId={notification.notificationId}
                  notificationType={notification.notificationType}
                  userId={notification.invitingMemberId}
                  userName={notification.invitingMemberName}
                  spaceId={notification.spaceId}
                  spaceName={notification.spaceName}
                  isAccepted={notification.isAccepted}
                  onAccept={() =>
                    handleAcceptInvite({
                      notificationId: notification.notificationId,
                    })
                  }
                  onClose={() =>
                    handleDeleteNotification({
                      notificationId: notification.notificationId,
                    })
                  }
                  key={notification.notificationId}
                />
              </li>
            ))}
          </Fragment>
        ))
      ) : (
        <div className="py-5 text-center text-sm font-medium text-gray9">
          {NONE_NOTIFICATION_RESULT}
        </div>
      )}
      <div ref={target}></div>
    </ul>
  )
}

export default NotificationList
