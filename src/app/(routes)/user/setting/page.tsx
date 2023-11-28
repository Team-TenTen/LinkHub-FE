'use client'

import UserInfoForm from '@/components/UserInfoForm/UserInfoForm'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const UserSettingPage = () => {
  const { currentUser } = useCurrentUser()

  return (
    <div>
      {currentUser && (
        <UserInfoForm
          userData={currentUser}
          formType="Setting"
        />
      )}
    </div>
  )
}

export default UserSettingPage
