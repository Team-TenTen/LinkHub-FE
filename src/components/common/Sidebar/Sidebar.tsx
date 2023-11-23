'use client'

import { useEffect, useRef, useState } from 'react'
import { mock_userData } from '@/data'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ArchiveBoxIcon, StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import ThemeButton from '../ThemeButton/ThemeButton'
import { useMySpace } from './hooks/useMySpace'
import useSidebar from './hooks/useSidebar'

export interface SidebarProps {
  onClose: () => void
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { currentUser } = useCurrentUser()
  const spaces = useMySpace(currentUser?.memberId!, {
    pageNumber: 0,
    pageSize: 5,
    filter: '',
    keyWord: '',
  })

  const user = mock_userData
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { spaceType, handleSpaceType, handleOverlayClick, logout } = useSidebar(
    {
      sidebarRef,
      onClose,
    },
  )

  return (
    <div
      ref={sidebarRef}
      onClick={handleOverlayClick}
      className="fixed left-0 right-0 top-0 z-50 mx-auto flex h-screen w-full max-w-[500px] flex-col justify-center bg-black/40 shadow-xl">
      <div className="absolute right-0 flex h-full w-full max-w-[300px] flex-col justify-between rounded-l-xl bg-bgColor px-2 pb-1 pt-6">
        <div className="flex flex-col">
          {currentUser ? (
            <>
              <div className="flex items-center px-2">
                <Avatar
                  src={currentUser.profileImagePath}
                  width={40}
                  height={40}
                  alt={currentUser.nickname}
                />
                <p className="font-sm ml-3 w-full overflow-hidden text-ellipsis	whitespace-nowrap font-medium text-gray9">
                  {currentUser.nickname}
                </p>
                <Button onClick={onClose}>
                  <XMarkIcon className="h-6 w-6" />
                </Button>
              </div>
              <Link
                href={`/user/${currentUser.memberId}`}
                className="my-2 px-2 py-2 text-base font-bold text-gray9"
                onClick={onClose}>
                프로필
              </Link>
              <div className="border-y border-slate3 px-2">
                <div className="mt-2 flex justify-between py-2 text-base font-bold text-gray9">
                  {spaceType}
                  {spaceType === '내 스페이스' ? (
                    <Button
                      className="button button-round button-white"
                      onClick={handleSpaceType}>
                      <StarIcon className="h-4 w-4 text-yellow-300" />
                      즐겨찾기
                    </Button>
                  ) : (
                    <Button
                      className="button button-round button-white"
                      onClick={handleSpaceType}>
                      <ArchiveBoxIcon className="h-4 w-4 text-emerald-500" />내
                      스페이스
                    </Button>
                  )}
                </div>
                <ul>
                  {spaceType === '내 스페이스' ? (
                    spaces &&
                    Object.values(spaces).map(({ spaceId, spaceName }) => (
                      <li
                        className="border-b border-slate3 last:border-none"
                        key={spaceId}>
                        <Link
                          href={`/space/${spaceId}`}
                          className="block px-3 py-2.5 text-sm text-gray9"
                          onClick={onClose}>
                          {spaceName}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <>{/* 즐겨찾기 스페이스 */}</>
                  )}
                </ul>
                <Link
                  href={`/user/${currentUser.memberId}/space`}
                  className="font-gray6 my-2 block w-full rounded-3xl border border-slate6 px-3 py-2.5 text-center text-sm font-medium text-slate6"
                  onClick={onClose}>
                  스페이스 전체보기
                </Link>
              </div>
              <Link
                href="/space/create"
                className="my-2 px-2 py-2 text-base font-bold text-gray9"
                onClick={onClose}>
                스페이스 생성
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-end border-b border-slate3 px-2 pb-2">
              <Button onClick={onClose}>
                <XMarkIcon className="h-6 w-6" />
              </Button>
              <Link
                href={`/login`}
                className="w-full py-2 text-base font-bold text-gray9"
                onClick={onClose}>
                로그인
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <ThemeButton />
          {user && (
            <button
              className="border-t border-slate3 px-2 py-3 text-left text-sm text-gray9"
              onClick={logout}>
              로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
