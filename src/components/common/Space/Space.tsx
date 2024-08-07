'use client'

import React from 'react'
import { useModal } from '@/hooks'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import {
  LockClosedIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/24/outline'
import { InboxArrowDownIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../Button/Button'
import Chip from '../Chip/Chip'
import LoginModal from '../Modal/LoginModal'
import { notify } from '../Toast/Toast'
import { SPACE_CONSTANT } from './constants'
import useFavorites from './hooks/useFavorites'

interface SpaceProps {
  userName: string
  spaceId: number
  type: 'Card' | 'Header'
  spaceName: string
  spaceImage?: string
  description: string
  category: string
  scrap: number
  favorite: number
  hasFavorite?: boolean
  hasScrap?: boolean
  isVisible?: boolean
}

const Space = ({
  userName,
  spaceId,
  type,
  spaceName,
  spaceImage,
  description,
  category,
  scrap,
  favorite,
  hasFavorite,
  hasScrap,
  isVisible,
}: SpaceProps) => {
  const router = useRouter()
  const { isLoggedIn } = useCurrentUser()
  const { isFavorites, favoritesCount, handleClickFavorite } = useFavorites({
    spaceId,
    hasFavorite,
    favorite,
  })

  const { Modal, isOpen, modalOpen, modalClose } = useModal()

  const handleClickScrapButton = async () => {
    if (!hasScrap) {
      router.push(`/space/${spaceId}/scrap`)
    } else {
      notify('error', '스페이스는 한 번만 가져갈 수 있습니다.')
    }
  }

  return (
    <>
      {type === 'Card' ? (
        <Link
          prefetch={true}
          className="relative flex gap-3 rounded-md border border-slate3 p-2"
          href={`/space/${spaceId}`}>
          {spaceImage && (
            <Image
              priority
              className="z-[-100] rounded-md object-cover opacity-50"
              src={spaceImage || ''}
              alt="space-image"
              fill
              sizes="(max-width: 768px) 22vw, (max-width: 1200px) 100px, 110px"
            />
          )}
          <div className="flex grow flex-col justify-center gap-1 rounded-md bg-white bg-opacity-60 px-3 py-1.5 dark:bg-gray-900 dark:bg-opacity-60">
            <div>
              <div className="mr-1 inline-flex text-sm text-gray9">
                {userName} /
              </div>
              <div className="inline-flex text-sm font-bold text-gray9">
                {spaceName}
              </div>
            </div>
            <div className="line-clamp-1 min-h-[16px] text-xs font-normal text-gray6">
              {description}
            </div>
            <div className="flex items-center justify-end pt-1">
              <Chip label={category} />
              <div className="flex grow items-center justify-end gap-x-1.5 text-xs font-medium text-slate6">
                <span className="flex gap-x-0.5">
                  <InboxArrowDownIcon className="h-4 w-4" />
                  {scrap}
                </span>
                <span className="flex gap-x-0.5">
                  <StarIconOutline className="h-4 w-4" />
                  {favorite}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="relative flex flex-col gap-10 p-4">
          <Image
            priority
            className="z-[-100] object-cover"
            src={spaceImage || ''}
            alt="space-image"
            fill
          />
          <div className="flex justify-end gap-2">
            <Button
              className="button button-round button-white"
              onClick={() => {
                isLoggedIn ? handleClickScrapButton() : modalOpen()
              }}>
              {hasScrap ? (
                <InboxArrowDownIcon className="h-4 w-4 text-emerald-500" />
              ) : (
                <InboxArrowDownIcon className="h-4 w-4" />
              )}
              {SPACE_CONSTANT.SCRAP} {scrap}
            </Button>
            <Button
              className="button button-round button-white"
              onClick={() => {
                isLoggedIn ? handleClickFavorite(isFavorites) : modalOpen()
              }}>
              {isFavorites ? (
                <StarIconSolid className="h-4 w-4 text-yellow-300" />
              ) : (
                <StarIconOutline className="h-4 w-4" />
              )}
              {SPACE_CONSTANT.FAVORITE} {favoritesCount}
            </Button>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-white bg-opacity-60 px-3 py-1.5 dark:bg-gray-900 dark:bg-opacity-60">
            <div>
              <div className="mr-1 inline-flex text-lg text-gray9">
                {userName} /
              </div>
              <div className="inline-flex text-lg font-bold text-gray9">
                {spaceName}
              </div>
            </div>
            <div className="line-clamp-1 text-xs font-normal text-gray6">
              {description}
            </div>
            <div className="flex grow items-center justify-between">
              <Chip label={category} />
              {!isVisible && <LockClosedIcon className="h-4 w-4" />}
            </div>
          </div>
        </div>
      )}
      <LoginModal
        Modal={Modal}
        isOpen={isOpen}
        modalClose={modalClose}
      />
    </>
  )
}

export default React.memo(Space)
