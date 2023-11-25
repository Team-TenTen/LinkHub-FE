'use client'

import { Avatar, CategoryListItem } from '@/components'
import Button from '@/components/common/Button/Button'
import FollowList from '@/components/common/FollowList/FollowList'
import LoginModal from '@/components/common/Modal/LoginModal'
import { CATEGORIES_RENDER, PROFILE_MSG } from '@/constants'
import { useFollowUser, useModal } from '@/hooks'
import useGetProfile from '@/hooks/useGetProfile'
import {
  fetchGetFollowers,
  fetchGetFollowing,
} from '@/services/user/follow/follow'
import { cls, getProfileButtonColor, getProfileButtonText } from '@/utils'
import { useRouter } from 'next/navigation'

const UserPage = () => {
  const { user, myId } = useGetProfile()
  const router = useRouter()
  const { Modal, isOpen, modalClose, currentModal, handleOpenCurrentModal } =
    useModal()
  const {
    isFollowing,
    followingCount,
    setFollowingCount,
    followerCount,
    handleClickFollow,
  } = useFollowUser({
    memberId: user?.memberId || 0,
    isInitFollowing: !!user?.isFollowing,
    followingInitCount: user?.followingCount || 0,
    followerInitCount: user?.followerCount || 0,
    handleOpenCurrentModal,
  })

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-6">
        <div className="flex gap-3">
          {user?.profileImagePath && (
            <Avatar
              src={user.profileImagePath}
              width={80}
              height={80}
              alt="profile"
            />
          )}
          <div className="flex flex-col gap-1 py-0.5">
            <div className="text-xl font-semibold text-gray9">
              {user?.nickname}
            </div>
            <div className="text-xs font-medium text-gray6">
              {user?.newsEmail}
            </div>
            <div className="flex gap-1 text-xs font-medium text-gray6">
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
            </div>
          </div>
        </div>
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
        <div className="flex flex-col ">
          <div className="py-3 text-sm font-semibold text-gray9">
            {PROFILE_MSG.FAVORITE_CATEGORY}
          </div>
          <div>
            <CategoryListItem
              label={
                user?.favoriteCategory
                  ? CATEGORIES_RENDER[user.favoriteCategory]
                  : '없음'
              }
              active={true}
              disabled={true}
            />
          </div>
        </div>
        <div>
          <div className="py-3 text-sm font-semibold text-gray9">
            {PROFILE_MSG.DESCRIPTION}
          </div>
          <div className="text-sm font-normal text-gray9">{user?.aboutMe}</div>
        </div>
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

export default UserPage
