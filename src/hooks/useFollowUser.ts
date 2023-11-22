import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchFollowUser,
  fetchUnFollowUser,
} from '@/services/user/follow/route'
import { debounce } from 'lodash'

export interface UseFollowUserProps {
  memberId: number
  isInitFollowing?: boolean
  followerInitCount: number
}

const useFollowUser = ({
  memberId,
  isInitFollowing,
  followerInitCount,
}: UseFollowUserProps) => {
  const [isFollowing, setIsFollowing] = useState(isInitFollowing)
  const [followerCount, setFollowerCount] = useState<number>(followerInitCount)

  useEffect(() => {
    setIsFollowing(isInitFollowing)
  }, [isInitFollowing])

  useEffect(() => {
    setFollowerCount(followerInitCount)
  }, [followerInitCount])

  const debounceUnFollowUser = useMemo(
    () =>
      debounce(async () => {
        await fetchUnFollowUser({ memberId })
      }, 500),
    [memberId],
  )

  const debounceFollowUser = useMemo(
    () =>
      debounce(async () => {
        await fetchFollowUser({ memberId })
      }, 500),
    [memberId],
  )

  const handleFollowClick = useCallback(
    (isFollowing: boolean | undefined) => {
      setIsFollowing((prev) => !prev)
      if (isFollowing) {
        setFollowerCount((prev) => prev - 1)
        debounceUnFollowUser()
      } else {
        setFollowerCount((prev) => prev + 1)
        debounceFollowUser()
      }
    },
    [debounceUnFollowUser, debounceFollowUser],
  )

  return { isFollowing, followerCount, handleFollowClick }
}

export default useFollowUser
