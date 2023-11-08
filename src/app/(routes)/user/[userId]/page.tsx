'use client'

import { Avatar, CategoryListItem } from '@/components'
import Button from '@/components/common/Button/Button'
import { mock_userData } from '@/data'

const UserPage = () => {
  const userData = mock_userData

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
            <div className="text-xs font-medium text-gray6">
              팔로잉 0 | 팔로워 0
            </div>
          </div>
        </div>
        <Button
          type="button"
          className="button button-md button-lg button-white">
          프로필 수정
        </Button>
        <div className="flex flex-col ">
          <div className="py-3 text-sm font-semibold text-gray9">
            관심 카테고리
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
            한 줄 소개
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
