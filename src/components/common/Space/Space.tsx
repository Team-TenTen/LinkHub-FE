'use client'

import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { InboxArrowDownIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../Button/Button'
import Chip from '../Chip/Chip'
import useToggle from '../Toggle/hooks/useToggle'
import { SPACE_CONSTANT } from './constants'

interface SpaceProps {
  _spaceId?: string
  type: 'Card' | 'Header'
  spaceName: string
  spaceImage: string
  description: string
  category: string
  scrap: number
  favorite: number
  onClickScrap?: (_e?: React.MouseEvent<HTMLButtonElement>) => void
  onClickFavorite?: (_e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Space = ({
  _spaceId,
  type,
  spaceName,
  spaceImage,
  description,
  category,
  scrap,
  favorite,
  onClickScrap,
  onClickFavorite,
}: SpaceProps) => {
  const [clicked, toggle] = useToggle()
  const router = useRouter()

  const handleClickScrapButton = () => {
    onClickScrap?.()
  }

  const handleClickFavoriteButton = () => {
    toggle()
    onClickFavorite?.()
  }

  return (
    <>
      {type === 'Card' ? (
        <div
          className="relative flex gap-3 rounded-md border border-slate3 p-2"
          onClick={() => {
            router.push(`/space/${_spaceId}`)
          }}>
          <Image
            className="z-[-100] rounded-md object-cover opacity-50"
            src={spaceImage}
            alt="space-image"
            fill
          />
          <div className="flex grow flex-col justify-center gap-1 rounded-md bg-white bg-opacity-60 px-3 py-1.5 dark:bg-gray-900 dark:bg-opacity-60">
            <div className="text-sm font-bold text-gray9">{spaceName}</div>
            <div className="line-clamp-1 text-xs font-normal text-gray6">
              {description}
            </div>
            <div className="flex items-center justify-end">
              <Chip label={category} />
              <div className="flex grow items-center justify-end gap-2">
                <Button className="button button-round button-white">
                  <InboxArrowDownIcon className="h-4 w-4" />
                  {scrap}
                </Button>
                <Button className="button button-round button-white">
                  {clicked ? (
                    <StarIconSolid className="h-4 w-4 text-yellow-300" />
                  ) : (
                    <StarIconOutline className="h-4 w-4" />
                  )}
                  {favorite}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col gap-10 p-4">
          <Image
            className="z-[-100] object-cover"
            src={spaceImage}
            alt="space-image"
            fill
          />
          <div className="flex justify-end">
            <Chip label={category} />
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-white bg-opacity-60 px-3 py-1.5 dark:bg-gray-900 dark:bg-opacity-60">
            <div className="text-lg font-bold text-gray9">{spaceName}</div>
            <div className="flex grow items-center gap-2">
              <Button
                className="button button-round button-white"
                onClick={handleClickScrapButton}>
                <InboxArrowDownIcon className="h-4 w-4" />
                {SPACE_CONSTANT.SCRAP} {scrap}
              </Button>
              <Button
                className="button button-round button-white"
                onClick={handleClickFavoriteButton}>
                {clicked ? (
                  <StarIconSolid className="h-4 w-4 text-yellow-300" />
                ) : (
                  <StarIconOutline className="h-4 w-4" />
                )}
                {SPACE_CONSTANT.FAVORITE} {favorite}
              </Button>
            </div>
            <div className="line-clamp-1 text-xs font-normal text-gray6">
              {description}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Space
