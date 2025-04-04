'use client'

import { PROFILE_MSG } from '@/constants'
import { useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { fetchGetFollowers, fetchGetFollowing } from '@/services/users/useUsers'
import { UserProfileResBody } from '@/types'
import FollowList from '../common/FollowList/FollowList'
import LoginModal from '../common/Modal/LoginModal'

const FollowListButton = ({ user }: { user: UserProfileResBody }) => {
  const { currentUser } = useCurrentUser()
  const myId = currentUser?.memberId
  const { Modal, isOpen, modalClose, currentModal, handleOpenCurrentModal } =
    useModal()

  return (
    <>
      <div
        className="cursor-pointer hover:font-semibold"
        onClick={() => {
          handleOpenCurrentModal('following')
        }}>
        {PROFILE_MSG.FOLLOWING} {user?.followingCount}
      </div>
      {PROFILE_MSG.LIST_DIVIDER}
      <div
        className="cursor-pointer hover:font-semibold"
        onClick={() => {
          handleOpenCurrentModal('follower')
        }}>
        {PROFILE_MSG.FOLLOWER} {user?.followerCount}
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
                followingCount={user?.followingCount}
              />
            )}
            {currentModal === 'follower' && (
              <FollowList
                memberId={user?.memberId}
                fetchFn={fetchGetFollowers}
                myId={myId}
                type="follower"
                followingCount={user?.followingCount}
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
