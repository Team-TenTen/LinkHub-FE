import { useCallback } from 'react'
import { useDeleteFollow, usePostFollow } from '@/services/users/useUsers'
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

  const handleRemoveFollow = useCallback(
    () =>
      deleteFollow({
        memberId: targetMemberId,
      }),
    [targetMemberId, deleteFollow],
  )

  const handleAddFollow = useCallback(
    () =>
      postFollow({
        memberId: targetMemberId,
      }),
    [targetMemberId, postFollow],
  )

  const handleClickFollow = useCallback(
    (isFollowing: boolean) => {
      if (isLoggedIn) {
        if (isFollowing) {
          handleRemoveFollow()
        } else {
          handleAddFollow()
        }
      } else {
        handleOpenCurrentModal?.('login')
      }
    },
    [handleRemoveFollow, handleAddFollow, isLoggedIn, handleOpenCurrentModal],
  )

  const handleClickListInFollow = useCallback(
    (isFollowing: boolean) => {
      if (isFollowing) {
        handleRemoveFollow()
      } else {
        handleAddFollow()
      }
    },
    [handleRemoveFollow, handleAddFollow],
  )

  return {
    handleClickFollow,
    handleClickListInFollow,
  }
}

export default useFollowUser
