import { NotificationController } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '알림',
}

const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  return <NotificationController>{children}</NotificationController>
}

export default NotificationLayout
