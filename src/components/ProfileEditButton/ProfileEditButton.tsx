'use client'

import { useFollowUser, useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { UserProfileResBody } from '@/types'
import { cls, getProfileButtonColor, getProfileButtonText } from '@/utils'
import { useRouter } from 'next/navigation'
import Button from '../common/Button/Button'

const ProfileEditButton = ({ user }: { user: UserProfileResBody }) => {
  const router = useRouter()
  const { currentUser } = useCurrentUser()
  const myId = currentUser?.memberId
  const { handleOpenCurrentModal } = useModal()
  const { handleClickFollow } = useFollowUser({
    profileId: user?.memberId || 0,
    memberId: currentUser?.memberId || 0,
    myId: myId || 0,
    handleOpenCurrentModal,
  })

  const buttonColor = getProfileButtonColor({
    isFollowing: user?.isFollowing,
    memberId: user?.memberId,
    myId,
  })

  const buttonText = getProfileButtonText({
    isFollowing: user?.isFollowing,
    memberId: user?.memberId,
    myId,
  })

  return (
    <>
      {user?.memberId && myId && (
        <Button
          type="button"
          onClick={() => {
            if (user?.memberId === myId) {
              router.push('/user/setting')
            } else if (user?.isFollowing) {
              handleClickFollow(user?.isFollowing)
            } else {
              handleClickFollow(user?.isFollowing)
            }
          }}
          className={cls('button button-md button-lg', buttonColor)}>
          {buttonText}
        </Button>
      )}
    </>
  )
}

export default ProfileEditButton
