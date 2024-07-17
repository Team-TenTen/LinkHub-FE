'use client'

import { SEACH_MODAL_INFO } from '@/components/common/SearchModal/constants'

const NotificationPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="py-5 text-center text-sm font-medium text-gray9">
        {SEACH_MODAL_INFO}
      </div>
    </div>
  )
}

export default NotificationPage
