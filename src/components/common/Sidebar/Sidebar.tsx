'use client'

import { useRef, useState } from 'react'
import { Spinner } from '@/components'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useGetUserProfile } from '@/services/users/useUsers'
import { cls } from '@/utils'
import { PlusIcon } from '@heroicons/react/20/solid'
import { UserIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  ArchiveBoxIcon as ArchiveBoxOutlineIcon,
  StarIcon as StarOutlineIcon,
} from '@heroicons/react/24/outline'
import { ArchiveBoxIcon, StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import DeferredComponent from '../DeferedComponent/DeferedComponent'
import ThemeButton from '../ThemeButton/ThemeButton'
import { useMySpace } from './hooks/useMySpace'
import useSidebar from './hooks/useSidebar'

export interface SidebarProps {
  isSidebarOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isSidebarOpen, onClose }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(isSidebarOpen)
  const { currentUser } = useCurrentUser()
  const { data: user } = useGetUserProfile(currentUser?.memberId!)

  const sidebarRef = useRef<HTMLDivElement>(null)
  const {
    spaceType,
    handleSpaceType,
    handleCloseClick,
    handleOverlayClick,
    logout,
  } = useSidebar({
    sidebarRef,
    onClose,
    setIsOpen,
  })

  const { spaces, isSideBarLoading } = useMySpace(
    currentUser?.memberId!,
    spaceType,
    {
      pageNumber: 0,
      pageSize: 5,
      filter: '',
      keyWord: '',
    },
  )

  return (
    <div
      ref={sidebarRef}
      onClick={handleOverlayClick}
      className={cls(
        'fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto flex h-full w-full flex-col justify-center overflow-hidden shadow-xl',
        isOpen ? 'animate-openOverlay' : 'animate-closeOverlay',
      )}>
      <div
        className={cls(
          'horizontal-scroll absolute bottom-0 top-0 flex h-full w-full max-w-[300px] flex-col justify-between  overflow-scroll rounded-l-xl bg-bgColor px-2 pb-1 pt-6',
          isOpen ? 'animate-openSidebar' : 'animate-closeSidebar',
        )}>
        <div className="flex flex-col">
          {user ? (
            isSideBarLoading ? (
              <DeferredComponent>
                <Spinner />
              </DeferredComponent>
            ) : (
              <>
                <div className="flex items-center px-2">
                  <div className="relative h-10 w-10 shrink-0">
                    <Avatar
                      src={user.profileImagePath}
                      alt={user.nickname}
                    />
                  </div>
                  <p className="font-sm ml-3 w-full overflow-hidden text-ellipsis	whitespace-nowrap font-medium text-gray9">
                    {user.nickname}
                  </p>
                  <Button onClick={handleCloseClick}>
                    <XMarkIcon className="h-6 w-6" />
                  </Button>
                </div>
                <Link
                  prefetch={true}
                  href={`/user/${user.memberId}`}
                  className="mb-2 mt-4 flex items-center px-2 py-2 text-base font-bold text-gray9"
                  onClick={onClose}>
                  <UserIcon className="mr-1.5 h-5 w-5" />내 프로필
                </Link>
                <div className="border-y border-slate3 px-2">
                  <div className="mt-2 flex justify-between py-2 text-base font-bold text-gray9">
                    <div className="flex items-center">
                      {spaceType === '내 스페이스' ? (
                        <ArchiveBoxOutlineIcon className="mr-1.5 h-5 w-5" />
                      ) : (
                        <StarOutlineIcon className="mr-1.5 h-5 w-5" />
                      )}
                      {spaceType}
                    </div>
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
                        <ArchiveBoxIcon className="h-4 w-4 text-emerald-500" />
                        내 스페이스
                      </Button>
                    )}
                  </div>
                  <ul>
                    {spaces &&
                      Object.values(spaces).map(({ spaceId, spaceName }) => (
                        <li key={spaceId}>
                          <Link
                            prefetch={true}
                            href={`/space/${spaceId}`}
                            className="block px-3 py-1.5 text-sm text-gray9 hover:underline"
                            onClick={onClose}>
                            {spaceName}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <Link
                    prefetch={true}
                    href={`/user/${user.memberId}/space`}
                    className="font-gray6 my-2 block w-full rounded-3xl border border-slate6 px-3 py-2.5 text-center text-sm font-medium text-slate6"
                    onClick={onClose}>
                    스페이스 전체보기
                  </Link>
                </div>
                <Link
                  prefetch={true}
                  href="/space/create"
                  className="my-2 flex items-center px-2 py-2 text-base font-bold text-gray9"
                  onClick={onClose}>
                  <PlusIcon className="mr-1.5 h-5 w-5" />
                  스페이스 생성
                </Link>
              </>
            )
          ) : (
            <div className="flex flex-col items-end border-b border-slate3 px-2 pb-2">
              <Button onClick={handleCloseClick}>
                <XMarkIcon className="h-6 w-6" />
              </Button>
              <Link
                prefetch={true}
                href={`/login`}
                className="w-full py-2 text-base font-bold text-gray9"
                onClick={onClose}>
                로그인
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="pb-2">
            <ThemeButton />
          </div>
          {currentUser && (
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
