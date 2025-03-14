import { useState } from 'react'
import { useGetMemberProfile } from '@/services/members/useMember'
import { usePathname } from 'next/navigation'
import { useCurrentUser } from './useCurrentUser'

const useGetProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const path = usePathname()
  const userId = Number(path.split('/')[2])
  const { currentUser } = useCurrentUser()
  const myId = currentUser?.memberId
  const { data: userData } = useGetMemberProfile(userId)

  return { user: userData, myId, isProfileLoading: isLoading }
}

export default useGetProfile
