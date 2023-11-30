'use client'

import { Fragment } from 'react'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { fetchAccetpSpaceInvitation } from '@/services/space/spaces'
import { InvitationsNotification, InvitationsReqBody } from '@/types'
import { useRouter } from 'next/navigation'
import Notification from '../Notification/Notification'
import useNotificationQuery from './hooks/useNotificationQuery'

export interface NotificationListProps {
  fetchFn: ({ pageNumber, pageSize }: InvitationsReqBody) => Promise<any>
  type: 'FOLLOW' | 'COMMENT' | 'INVITATION'
}

const NotificationList = ({ fetchFn, type }: NotificationListProps) => {
  const router = useRouter()
  const { notificationList, fetchNextPage, hasNextPage } = useNotificationQuery(
    {
      fetchFn,
      type,
    },
  )
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  const handleAcceptInvite = async (notificationId: number) => {
    try {
      const { spaceId } = await fetchAccetpSpaceInvitation({ notificationId })
      alert('스페이스 초대가 수락되었습니다.')
      router.push(`/space/${spaceId}`)
    } catch (e) {
      alert('스페이스 초대 수락에 실패하였습니다.')
    }
  }

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
                onAccept={() => handleAcceptInvite(notification.notificationId)}
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
