'use client'

import { Notification } from '@/components'
import { mock_notificationInviteData } from '@/data'

const NotificationInvitePage = () => {
  const notifications = mock_notificationInviteData

  return (
    <div className="flex flex-col gap-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notificationId={notification.id}
          type={notification.type}
          userId={notification.userId}
          userName={notification.userName}
          spaceId={notification.spaceId}
          spaceName={notification.spaceName}
          isRead={notification.isRead}
          isAccept={notification.isAccept}
          onAccept={() => console.log('스페이스 수락')}
          onClose={() => console.log('알람 닫기')}
        />
      ))}
    </div>
  )
}

export default NotificationInvitePage
