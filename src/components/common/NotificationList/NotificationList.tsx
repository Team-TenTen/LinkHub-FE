import { Fragment } from 'react'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { InvitationsNotification, InvitationsReqBody } from '@/types'
import Notification from '../Notification/Notification'
import useNotificationQuery from './hooks/useNotificationQuery'

export interface NotificationListProps {
  fetchFn: ({ pageNumber, pageSize }: InvitationsReqBody) => Promise<any>
  type: 'FOLLOW' | 'COMMENT' | 'INVITATION'
}

const NotificationList = ({ fetchFn, type }: NotificationListProps) => {
  const { notificationList, fetchNextPage, hasNextPage } = useNotificationQuery(
    {
      fetchFn,
      type,
    },
  )
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return (
    <ul className="flex flex-col gap-y-2">
      {notificationList?.pages.map((group, i) => (
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
                onAccept={() => console.log('스페이스 수락')}
                onClose={() => console.log('알람 닫기')}
                key={notification.notificationId}
              />
            </li>
          ))}
        </Fragment>
      ))}
      <div ref={target}></div>
    </ul>
  )
}

export default NotificationList
