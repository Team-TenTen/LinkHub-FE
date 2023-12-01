'use client'

import { NONE_NOTIFICATION_RESULT } from '@/components/common/NotificationList/constants'

const NotificationPage = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* {notifications.map((notification) => (
        <Notification
          notificationId={notification.id}
          notificationType={notification.notificationType}
          userId={notification.userId}
          userName={notification.userName}
          spaceId={notification.spaceId}
          spaceName={notification.spaceName}
          isRead={notification.isRead}
          key={notification.id}
          onClose={() => console.log('알람 닫기')}
        />
      ))} */}
      <div className="flex justify-center text-base font-semibold text-gray9">
        {NONE_NOTIFICATION_RESULT}
      </div>
    </div>
  )
}

export default NotificationPage
