import {
  Avatar,
  CategoryListItem,
  FollowListButton,
  ProfileEditButton,
} from '@/components'
import { CATEGORIES_RENDER, PROFILE_MSG } from '@/constants'
import { fetchGetUserProfile } from '@/services/user/profile/profile'
import { UserLayoutProps } from './layout'

export default async function UserPage({
  params: { userId },
}: UserLayoutProps) {
  const user = await fetchGetUserProfile({ memberId: userId })

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-6">
        <div className="flex gap-3">
          {user?.profileImagePath && (
            <div className="relative h-20 w-20">
              <Avatar
                src={user.profileImagePath}
                alt="profile"
              />
            </div>
          )}
          <div className="flex flex-col gap-1 py-0.5">
            <div className="text-xl font-semibold text-gray9">
              {user?.nickname}
            </div>
            <div className="text-xs font-medium text-gray6">
              {user?.newsEmail}
            </div>
            <div className="flex gap-1 text-xs font-medium text-gray6">
              <FollowListButton user={user} />
            </div>
          </div>
        </div>
        <ProfileEditButton user={user} />
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
    </>
  )
}
