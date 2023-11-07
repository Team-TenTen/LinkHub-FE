'use client'

import { Notification } from '@/components'
import { mock_notificationData } from '@/data'

const NotificationPage = () => {
  const notifications = mock_notificationData

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
          onAccept={() => console.log('스페이스 수락')}
          onClose={() => console.log('알람 닫기')}
        />
      ))}
    </div>
  )
}

export default NotificationPage
