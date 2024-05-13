'use client'

import { PROFILE_MSG } from '@/constants'
import { useFollowUser, useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import {
  fetchGetFollowers,
  fetchGetFollowing,
} from '@/services/user/follow/follow'
import { UserProfileResBody } from '@/types'
import FollowList from '../common/FollowList/FollowList'
import LoginModal from '../common/Modal/LoginModal'

const FollowListButton = ({ user }: { user: UserProfileResBody }) => {
  const { currentUser } = useCurrentUser()
  const myId = currentUser?.memberId
  const { Modal, isOpen, modalClose, currentModal, handleOpenCurrentModal } =
    useModal()
  const { followingCount, setFollowingCount, followerCount } = useFollowUser({
    memberId: user?.memberId || 0,
    isInitFollowing: !!user?.isFollowing,
    followingInitCount: user?.followingCount || 0,
    followerInitCount: user?.followerCount || 0,
    handleOpenCurrentModal,
  })

  return (
    <>
      <div
        className="cursor-pointer hover:font-semibold"
        onClick={() => {
          handleOpenCurrentModal('following')
        }}>
        {PROFILE_MSG.FOLLOWING} {followingCount}
      </div>
      {PROFILE_MSG.LIST_DIVIDER}
      <div
        className="cursor-pointer hover:font-semibold"
        onClick={() => {
          handleOpenCurrentModal('follower')
        }}>
        {PROFILE_MSG.FOLLOWER} {followerCount}
      </div>
      {currentModal !== 'login' && isOpen && (
        <Modal
          title={
            currentModal === 'following'
              ? `${PROFILE_MSG.FOLLOWING}`
              : `${PROFILE_MSG.FOLLOWER}`
          }
          onClose={modalClose}
          type={'follow'}>
          <div className="flex flex-col gap-2">
            {currentModal === 'following' && (
              <FollowList
                memberId={user?.memberId}
                fetchFn={fetchGetFollowing}
                myId={myId}
                type="following"
                followingCount={followingCount}
                setFollowingCount={setFollowingCount}
              />
            )}
            {currentModal === 'follower' && (
              <FollowList
                memberId={user?.memberId}
                fetchFn={fetchGetFollowers}
                myId={myId}
                type="follower"
                followingCount={followingCount}
                setFollowingCount={setFollowingCount}
              />
            )}
          </div>
        </Modal>
      )}
      {currentModal === 'login' && (
        <LoginModal
          Modal={Modal}
          isOpen={isOpen}
          modalClose={modalClose}
        />
      )}
    </>
  )
}

export default FollowListButton
