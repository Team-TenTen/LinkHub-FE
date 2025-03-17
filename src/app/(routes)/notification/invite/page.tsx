'use client'

import NotificationList from '@/components/common/NotificationList/NotificationList'
import { fetchGetInvitations } from '@/services/notification/useNotification'

const NotificationInvitePage = () => {
  return (
    <NotificationList
      fetchFn={fetchGetInvitations}
      type={'INVITATION'}
    />
  )
}

export default NotificationInvitePage
