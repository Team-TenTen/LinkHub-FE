import { useCallback, useMemo } from 'react'
import { useDeleteFollow, usePostFollow } from '@/services/users/useUsers'
import { debounce } from 'lodash'
import { useCurrentUser } from './useCurrentUser'

export interface UseFollowUserProps {
  profileId?: number
  memberId: number
  myId?: number
  handleOpenCurrentModal?: (current: string) => void
}

const useFollowUser = ({
  profileId,
  memberId,
  myId,
  handleOpenCurrentModal,
}: UseFollowUserProps) => {
  const { isLoggedIn } = useCurrentUser()
  const { mutateAsync: postFollow } = usePostFollow(profileId, myId)
  const { mutateAsync: deleteFollow } = useDeleteFollow(profileId, myId)
  const targetMemberId = profileId
    ? profileId === myId
      ? memberId
      : profileId
    : memberId

  const debounceUnFollowUser = useMemo(
    () =>
      debounce(async () => {
        await deleteFollow({
          memberId: targetMemberId,
        })
      }, 300),
    [targetMemberId, deleteFollow],
  )

  const debounceFollowUser = useMemo(
    () =>
      debounce(async () => {
        await postFollow({
          memberId: targetMemberId,
        })
      }, 300),
    [targetMemberId, postFollow],
  )

  const handleClickFollow = useCallback(
    (isFollowing: boolean) => {
      if (isLoggedIn) {
        if (isFollowing) {
          debounceUnFollowUser()
        } else {
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
      if (isFollowing) {
        debounceUnFollowUser()
      } else {
        debounceFollowUser()
      }
    },
    [debounceUnFollowUser, debounceFollowUser],
  )

  return {
    handleClickFollow,
    handleClickListInFollow,
  }
}

export default useFollowUser
