'use client'

import UserInfoForm from '@/components/UserInfoForm/UserInfoForm'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useGetMemberProfile } from '@/services/members/useMember'

const SettingController = () => {
  const { currentUser } = useCurrentUser()
  const { data: user } = useGetMemberProfile(currentUser?.memberId || 0)

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
