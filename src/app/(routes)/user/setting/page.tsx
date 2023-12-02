import { SettingController } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '프로필 수정',
}

const UserSettingPage = () => {
  return <SettingController />
}

export default UserSettingPage
