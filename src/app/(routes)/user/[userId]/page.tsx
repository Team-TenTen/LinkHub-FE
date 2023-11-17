'use client'

import { useCallback, useEffect, useState } from 'react'
import { Avatar, CategoryListItem } from '@/components'
import Button from '@/components/common/Button/Button'
import User from '@/components/common/User/User'
import { CATEGORIES_MAP, PROFILE_MSG } from '@/constants'
import { mock_userData2 } from '@/data'
import { useCurrentModal, useModal } from '@/hooks'
import { fetchGetUserProfile } from '@/services/user/profile/userProfile'
import { UserProfileResBody } from '@/types'
import { cls, getFollowChecked, getProfileButtonChecked } from '@/utils'
import { usePathname, useRouter } from 'next/navigation'

const UserPage = () => {
  const myId = 6 // TODO: 실제 유저의 데이터를 가져오는 로직으로 수정
  const userData = mock_userData2
  const path = usePathname()
  const userId = Number(path.split('/')[2])
  const router = useRouter()
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const [currentModal, handleChangeCurrentModal] = useCurrentModal()
  const [user, setUser] = useState<UserProfileResBody>()

  const handleGetUserProfile = useCallback(async () => {
    const userData = await fetchGetUserProfile({ userId })
    setUser(userData)
  }, [userId])

  useEffect(() => {
    handleGetUserProfile()
  }, [])

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
            } else if (getFollowChecked({ userData, myId })) {
              console.log('팔로잉 로직 추가')
            } else {
              console.log('팔로우 로직 추가')
            }
          }}
          className={cls(
            'button button-md button-lg',
            user?.memberId === myId
              ? 'button-white'
              : getFollowChecked({ userData, myId })
              ? 'button-gray'
              : 'button-emerald',
          )}>
          {getProfileButtonChecked({ userData, myId })}
        </Button>
        <div className="flex flex-col ">
          <div className="py-3 text-sm font-semibold text-gray9">
            {PROFILE_MSG.FAVORITE_CATEGORY}
          </div>
          <div>
            <CategoryListItem
              label={
                user?.favoriteCategory
                  ? CATEGORIES_MAP[user.favoriteCategory]
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
