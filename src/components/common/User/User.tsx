'use client'

import { cls } from '@/utils'
import Link from 'next/link'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import useToggle from '../Toggle/hooks/useToggle'

interface UserProps {
  id: number
  name: string
  profile: string
  oneLiner?: string
  isFollow?: boolean
  isAuth?: boolean
  onClick?: (id: number, isFollow: boolean) => void
}

const User = ({
  id,
  name,
  profile,
  oneLiner,
  isFollow,
  isAuth,
  onClick,
}: UserProps) => {
  const [isFollowing, toggle] = useToggle(isFollow)

  const handleButtonClick = () => {
    toggle()
    onClick?.(id, isFollowing)
  }

  return (
    <div className="flex items-center gap-x-3 rounded-md border border-slate3 p-3">
      <div className="inline-flex shrink-0">
        <Avatar
          src={profile}
          width={40}
          height={40}
          alt={name}
        />
      </div>
      <div className="flex grow flex-col gap-y-0.5 overflow-hidden py-0.5">
        <Link
          href={`/user/${id}`}
          className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-gray9">
          {name}
        </Link>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray6">
          {oneLiner}
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
            onClick={handleButtonClick}>
            {isFollowing ? '팔로잉' : '팔로우'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default User
