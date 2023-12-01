'use client'

import { Fragment } from 'react'
import { Spinner } from '@/components'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { fetchAccetpSpaceInvitation } from '@/services/space/spaces'
import { InvitationsNotification, InvitationsReqBody } from '@/types'
import { useRouter } from 'next/navigation'
import Notification from '../Notification/Notification'
import useDeleteNotification from './hooks/useDeleteNotification'
import useNotificationQuery from './hooks/useNotificationQuery'

export interface NotificationListProps {
  fetchFn: ({ pageNumber, pageSize }: InvitationsReqBody) => Promise<any>
  type: 'FOLLOW' | 'COMMENT' | 'INVITATION'
}

const NotificationList = ({ fetchFn, type }: NotificationListProps) => {
  const router = useRouter()
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

  const handleAcceptInvite = async (notificationId: number) => {
    try {
      const { spaceId } = await fetchAccetpSpaceInvitation({ notificationId })
      alert('스페이스 초대가 수락되었습니다.')
      router.push(`/space/${spaceId}`)
    } catch (e) {
      alert('스페이스 초대 수락에 실패하였습니다.')
    }
  }

  const { handleDeleteNotification } = useDeleteNotification({ type })

  return isNotificationLoading ? (
    <Spinner />
  ) : (
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
      ))}
      <div ref={target}></div>
    </ul>
  )
}

export default NotificationList
