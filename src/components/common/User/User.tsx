'use client'

import { Dispatch, SetStateAction } from 'react'
import { PROFILE_MSG } from '@/constants'
import { useFollowUser, useModal } from '@/hooks'
import { cls } from '@/utils'
import Link from 'next/link'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import LoginModal from '../Modal/LoginModal'

interface UserProps {
  memberId?: number
  nickname: string
  profileImagePath: string
  aboutMe?: string
  isFollowing?: boolean
  isAuth?: boolean
  followingCount?: number
  myId?: number
  profileId?: number
  setFollowingCount?: Dispatch<SetStateAction<number | undefined>>
}

const User = ({
  memberId,
  nickname,
  profileImagePath,
  aboutMe,
  isFollowing,
  isAuth,
  followingCount,
  myId,
  profileId,
  setFollowingCount,
}: UserProps) => {
  const { Modal, isOpen, modalClose, currentModal, handleOpenCurrentModal } =
    useModal()
  const { isFollowing: isFollowingValue, handleClickListInFollow } =
    useFollowUser({
      memberId: memberId || 0,
      isInitFollowing: !!isFollowing,
      followerInitCount: followingCount || 0,
    })

  return (
    <>
      <div className="flex items-center gap-x-3 rounded-md border border-slate3 p-3">
        <div className="relative inline-flex h-10 w-10 shrink-0">
          <Avatar
            src={profileImagePath || '/member-default.png'}
            alt="profile"
          />
        </div>
        <div className="flex grow flex-col gap-y-0.5 overflow-hidden py-0.5">
          <Link
            prefetch={true}
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
                isFollowingValue ? 'button-white' : 'button-emerald',
              )}
              onClick={() => {
                if (myId) {
                  handleClickListInFollow(isFollowingValue)
                  if (isFollowingValue) {
                    profileId === myId &&
                      setFollowingCount?.((prev) => prev! - 1)
                  } else {
                    profileId === myId &&
                      setFollowingCount?.((prev) => prev! + 1)
                  }
                } else {
                  handleOpenCurrentModal('login')
                }
              }}>
              {isFollowingValue ? PROFILE_MSG.FOLLOWING : PROFILE_MSG.FOLLOW}
            </Button>
          </div>
        )}
      </div>
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

export default User
