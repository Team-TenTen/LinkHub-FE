'use client'

import { Avatar, CategoryListItem } from '@/components'
import Button from '@/components/common/Button/Button'
import User from '@/components/common/User/User'
import { PROFILE_MSG } from '@/constants'
import { mock_userData2 } from '@/data'
import { useCurrentModal, useModal } from '@/hooks'

const UserPage = () => {
  const userData = mock_userData2
  const { Modal, isOpen, modalOpen, modalClose } = useModal()
  const [currentModal, handleChangeCurrentModal] = useCurrentModal()

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-6">
        <div className="flex gap-3">
          <Avatar
            src={userData.profile}
            width={80}
            height={80}
            alt="profile"
          />
          <div className="flex flex-col gap-1 py-0.5">
            <div className="text-xl font-semibold text-gray9">
              {userData.name}
            </div>
            <div className="text-xs font-medium text-gray6">
              {userData.email}
            </div>
            <div className="flex gap-1 text-xs font-medium text-gray6">
              <div
                className="cursor-pointer hover:font-semibold"
                onClick={() => {
                  handleChangeCurrentModal('following')
                  modalOpen()
                }}>
                {PROFILE_MSG.FOLLOWING} {userData.following.length}
              </div>
              {PROFILE_MSG.LIST_DIVIDER}
              <div
                className="cursor-pointer hover:font-semibold"
                onClick={() => {
                  handleChangeCurrentModal('follower')
                  modalOpen()
                }}>
                {PROFILE_MSG.FOLLOWER} {userData.follower.length}
              </div>
            </div>
          </div>
        </div>
        <Button
          type="button"
          className="button button-md button-lg button-white">
          {PROFILE_MSG.PROFILE_EDIT}
        </Button>
        <div className="flex flex-col ">
          <div className="py-3 text-sm font-semibold text-gray9">
            {PROFILE_MSG.FAVORITE_CATEGORY}
          </div>
          <div>
            <CategoryListItem
              label={userData.category}
              active={true}
              disabled={true}
            />
          </div>
        </div>
        <div>
          <div className="py-3 text-sm font-semibold text-gray9">
            {PROFILE_MSG.DESCRIPTION}
          </div>
          <div className="text-sm font-normal text-gray9">
            {userData.description}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal
          title={currentModal === 'following' ? '팔로잉' : '팔로워'}
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
