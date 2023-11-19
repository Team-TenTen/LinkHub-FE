'use client'

import { Avatar, CategoryListItem } from '@/components'
import Button from '@/components/common/Button/Button'
import User from '@/components/common/User/User'
import { CATEGORIES_RENDER, PROFILE_MSG } from '@/constants'
import { mock_userData2 } from '@/data'
import { useCurrentModal, useModal } from '@/hooks'
import useGetProfile from '@/hooks/useGetProfile'
import { cls, getProfileButtonColor, getProfileButtonText } from '@/utils'
import { useRouter } from 'next/navigation'

const UserPage = () => {
  const router = useRouter()
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const [currentModal, handleChangeCurrentModal] = useCurrentModal()
  const { user, myId } = useGetProfile()
  const userData = mock_userData2 // TODO: 팔로워/팔로우 목록 API 나오면 제거

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
                  handleChangeCurrentModal('following')
                  modalOpen()
                }}>
                {PROFILE_MSG.FOLLOWING} {user?.followingCount}
              </div>
              {PROFILE_MSG.LIST_DIVIDER}
              <div
                className="cursor-pointer hover:font-semibold"
                onClick={() => {
                  handleChangeCurrentModal('follower')
                  modalOpen()
                }}>
                {PROFILE_MSG.FOLLOWER} {user?.followerCount}
              </div>
            </div>
          </div>
        </div>
        <Button
          type="button"
          onClick={() => {
            if (user?.memberId === myId) {
              router.push('/user/setting')
            } else if (user?.isFollowing) {
              console.log('팔로잉 로직 추가')
            } else {
              console.log('팔로우 로직 추가')
            }
          }}
          className={cls(
            'button button-md button-lg',
            getProfileButtonColor({
              isFollowing: user?.isFollowing,
              memberId: user?.memberId,
              myId,
            }),
          )}>
          {getProfileButtonText({
            isFollowing: user?.isFollowing,
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
      {isOpen && (
        <Modal
          title={
            currentModal === 'following'
              ? `${PROFILE_MSG.FOLLOWING}`
              : `${PROFILE_MSG.FOLLOWER}`
          }
          onClose={modalClose}
          type={'follow'}>
          <div className="flex flex-col gap-2">
            {currentModal === 'following' &&
              userData.following.map((user) => (
                <User
                  id={user.userId}
                  name={user.userName}
                  profile={user.profile}
                  oneLiner={user.description}
                  isFollow={user.isFollow}
                  isAuth={123 === user.userId}
                  onClick={(id, isFollow) =>
                    console.log(isFollow ? `unfollow ${id}` : `follow ${id}`)
                  }
                  key={user.userId}
                />
              ))}
            {currentModal === 'follower' &&
              userData.follower.map((user) => (
                <User
                  id={user.userId}
                  name={user.userName}
                  profile={user.profile}
                  oneLiner={user.description}
                  isFollow={user.isFollow}
                  isAuth={123 === user.userId}
                  onClick={(id, isFollow) =>
                    console.log(isFollow ? `unfollow ${id}` : `follow ${id}`)
                  }
                  key={user.userId}
                />
              ))}
          </div>
        </Modal>
      )}
    </>
  )
}

export default UserPage
