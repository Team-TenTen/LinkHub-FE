'use client'

import { Avatar, CategoryListItem } from '@/components'
import Button from '@/components/common/Button/Button'
import { PROFILE_MSG } from '@/constants'
import { mock_userData2 } from '@/data'

const UserPage = () => {
  const userData = mock_userData2

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
              <div>
                {PROFILE_MSG.FOLLOWING} {userData.following}
              </div>
              {PROFILE_MSG.LIST_DIVIDER}
              <div>
                {PROFILE_MSG.FOLLOWER} {userData.follower}
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
    </>
  )
}

export default UserPage
