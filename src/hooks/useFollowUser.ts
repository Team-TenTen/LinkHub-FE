import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchFollowUser,
  fetchUnFollowUser,
} from '@/services/user/follow/follow'
import { useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { useCurrentUser } from './useCurrentUser'

export interface UseFollowUserProps {
  memberId: number
  isInitFollowing: boolean
  followingInitCount?: number
  followerInitCount: number
  handleOpenCurrentModal?: (current: string) => void
}

const useFollowUser = ({
  memberId,
  isInitFollowing,
  followerInitCount,
  followingInitCount,
  handleOpenCurrentModal,
}: UseFollowUserProps) => {
  const queryClient = useQueryClient()
  const { isLoggedIn } = useCurrentUser()
  const [isFollowing, setIsFollowing] = useState(isInitFollowing)
  const [followingCount, setFollowingCount] = useState(followingInitCount)
  const [followerCount, setFollowerCount] = useState(followerInitCount)

  useEffect(() => {
    setIsFollowing(isInitFollowing)
  }, [isInitFollowing])

  useEffect(() => {
    setFollowingCount(followingInitCount)
  }, [followingInitCount])

  useEffect(() => {
    setFollowerCount(followerInitCount)
  }, [followerInitCount])

  const debounceUnFollowUser = useMemo(
    () =>
      debounce(async () => {
        if (memberId) {
          await fetchUnFollowUser({ memberId })
          await queryClient.invalidateQueries({ queryKey: ['follow'] })
          await queryClient.invalidateQueries({ queryKey: ['users'] })
        }
      }, 500),
    [memberId, queryClient],
  )

  const debounceFollowUser = useMemo(
    () =>
      debounce(async () => {
        if (memberId) {
          await fetchFollowUser({ memberId })
          await queryClient.invalidateQueries({ queryKey: ['follow'] })
          await queryClient.invalidateQueries({ queryKey: ['users'] })
        }
      }, 500),
    [memberId, queryClient],
  )

  const handleClickFollow = useCallback(
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
        handleOpenCurrentModal?.('login')
      }
    },
    [
      debounceUnFollowUser,
      debounceFollowUser,
      isLoggedIn,
      handleOpenCurrentModal,
    ],
  )

  const handleClickListInFollow = useCallback(
    (isFollowing: boolean) => {
      setIsFollowing((prev) => !prev)
      if (isFollowing) {
        debounceUnFollowUser()
      } else {
        debounceFollowUser()
      }
    },
    [debounceUnFollowUser, debounceFollowUser],
  )

  return {
    isFollowing,
    followingCount,
    setFollowingCount,
    followerCount,
    handleClickFollow,
    handleClickListInFollow,
  }
}

export default useFollowUser
