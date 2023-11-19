import { useCallback, useEffect, useState } from 'react'
import { fetchGetUserProfile } from '@/services/user/profile/profile'
import { UserProfileResBody } from '@/types'
import { usePathname } from 'next/navigation'
import { useCurrentUser } from './useCurrentUser'

const useGetProfile = () => {
  const [user, setUser] = useState<UserProfileResBody>()
  const path = usePathname()
  const userId = Number(path.split('/')[2])
  const { currentUser } = useCurrentUser()
  const myId = currentUser?.memberId

  const handleGetUserProfile = useCallback(async () => {
    const userData = await fetchGetUserProfile({ userId })
    setUser(userData)
  }, [userId])

  useEffect(() => {
    handleGetUserProfile()
  }, [handleGetUserProfile])

  return { user, myId }
}

export default useGetProfile
