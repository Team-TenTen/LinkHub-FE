'use client'

import UserInfoForm from '@/components/UserInfoForm/UserInfoForm'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useGetUserProfile } from '@/services/users/useUsers'

const SettingController = () => {
  const { currentUser } = useCurrentUser()
  const { data: user } = useGetUserProfile(currentUser?.memberId || 0)

  return (
    <div>
      {user && (
        <UserInfoForm
          userData={user}
          formType="Setting"
        />
      )}
    </div>
  )
}

export default SettingController
