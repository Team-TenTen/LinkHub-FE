'use client'

import { cls } from '@/utils'
import Link from 'next/link'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'

interface UserProps {
  memberId?: number
  nickname: string
  profileImagePath: string
  aboutMe?: string
  isFollowing?: boolean
  isAuth?: boolean
  onClick?: (isFollowing: boolean) => void
}

const User = ({
  memberId,
  nickname,
  profileImagePath,
  aboutMe,
  isFollowing,
  isAuth,
  onClick,
}: UserProps) => {
  const handleFollowButtonClick = () => {
    onClick?.(!!isFollowing)
  }

  return (
    <div className="flex items-center gap-x-3 rounded-md border border-slate3 p-3">
      <div className="inline-flex shrink-0">
        <Avatar
          src={profileImagePath}
          width={40}
          height={40}
          alt="profile"
        />
      </div>
      <div className="flex grow flex-col gap-y-0.5 overflow-hidden py-0.5">
        <Link
          href={`/user/${memberId}`}
          className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-gray9">
          {nickname}
        </Link>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray6">
          {aboutMe}
        </p>
      </div>
      {!isAuth && (
        <div className="shrink-0">
          <Button
            type="button"
            className={cls(
              'button px-2.5 py-1.5 text-sm',
              isFollowing ? 'button-white' : 'button-emerald',
            )}
            onClick={handleFollowButtonClick}>
            {isFollowing ? '팔로잉' : '팔로우'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default User
