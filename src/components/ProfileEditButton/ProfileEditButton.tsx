'use client'

import { useFollowUser, useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { UserProfileResBody } from '@/types'
import { cls, getProfileButtonColor, getProfileButtonText } from '@/utils'
import { useRouter } from 'next/navigation'
import Button from '../common/Button/Button'
import DeferredComponent from '../common/DeferedComponent/DeferedComponent'
import Spinner from '../common/Spinner/Spinner'

const ProfileEditButton = ({ user }: { user: UserProfileResBody }) => {
  const router = useRouter()
  const { currentUser } = useCurrentUser()
  const myId = currentUser?.memberId
  const { handleOpenCurrentModal } = useModal()
  const { isFollowing, handleClickFollow } = useFollowUser({
    memberId: user?.memberId || 0,
    isInitFollowing: !!user?.isFollowing,
    followingInitCount: user?.followingCount || 0,
    followerInitCount: user?.followerCount || 0,
    handleOpenCurrentModal,
  })

  return myId ? (
    <Button
      type="button"
      onClick={() => {
        if (user?.memberId === myId) {
          router.push('/user/setting')
        } else if (isFollowing) {
          handleClickFollow(isFollowing)
        } else {
          handleClickFollow(isFollowing)
        }
      }}
      className={cls(
        'button button-md button-lg',
        getProfileButtonColor({
          isFollowing,
          memberId: user?.memberId,
          myId,
        }),
      )}>
      {getProfileButtonText({
        isFollowing,
        memberId: user?.memberId,
        myId,
      })}
    </Button>
  ) : (
    <DeferredComponent>
      <Spinner />
    </DeferredComponent>
  )
}

export default ProfileEditButton
