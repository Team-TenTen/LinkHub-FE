import { NotificationController } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '알림',
}

const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationController>
      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-[1200px] flex-col">{children}</div>
      </div>
    </NotificationController>
  )
}

export default NotificationLayout
