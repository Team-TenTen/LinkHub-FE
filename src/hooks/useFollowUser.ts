import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchFollowUser,
  fetchUnFollowUser,
} from '@/services/user/follow/route'
import { debounce } from 'lodash'
import { useCurrentUser } from './useCurrentUser'

export interface UseFollowUserProps {
  memberId: number
  isInitFollowing: boolean
  followerInitCount: number
  handleOpenCurrentModal: (current: string) => void
}

const useFollowUser = ({
  memberId,
  isInitFollowing,
  followerInitCount,
  handleOpenCurrentModal,
}: UseFollowUserProps) => {
  const { isLoggedIn } = useCurrentUser()
  const [isFollowing, setIsFollowing] = useState(isInitFollowing)
  const [followerCount, setFollowerCount] = useState(followerInitCount)

  useEffect(() => {
    setIsFollowing(isInitFollowing)
  }, [isInitFollowing])

  useEffect(() => {
    setFollowerCount(followerInitCount)
  }, [followerInitCount])

  const debounceUnFollowUser = useMemo(
    () =>
      debounce(async () => {
        if (memberId) {
          await fetchUnFollowUser({ memberId })
        }
      }, 500),
    [memberId],
  )

  const debounceFollowUser = useMemo(
    () =>
      debounce(async () => {
        if (memberId) {
          await fetchFollowUser({ memberId })
        }
      }, 500),
    [memberId],
  )

  const handleFollowClick = useCallback(
    (isFollowing: boolean) => {
      if (isLoggedIn) {
        setIsFollowing((prev) => !prev)
        if (isFollowing) {
          setFollowerCount((prev) => prev - 1)
          debounceUnFollowUser()
        } else {
          setFollowerCount((prev) => prev + 1)
          debounceFollowUser()
        }
      } else {
        handleOpenCurrentModal('login')
      }
    },
    [
      debounceUnFollowUser,
      debounceFollowUser,
      isLoggedIn,
      handleOpenCurrentModal,
    ],
  )

  return { isFollowing, followerCount, handleFollowClick }
}

export default useFollowUser
