import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { InboxArrowDownIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Button from '../Button/Button'
import Chip from '../Chip/Chip'

interface SpaceProps {
  type: 'Card' | 'Header'
  spaceName: string
  spaceImage: string
  description: string
  category: string
  scrap: number
  favorite: number
}

const Space = ({
  type,
  spaceName,
  spaceImage,
  description,
  category,
  scrap,
  favorite,
}: SpaceProps) => {
  return (
    <>
      {type === 'Card' ? (
        <div className="flex gap-3 rounded-md border border-slate3 p-3">
          <div className="items-center justify-center">
            <Image
              className="h-20 w-20 rounded-full border border-slate-300 object-cover"
              src={spaceImage}
              width={80}
              height={80}
              alt="space-image"
            />
          </div>
          <div className="flex grow flex-col justify-center gap-1">
            <div className="text-sm font-bold text-gray9">{spaceName}</div>
            <div className="text-xs font-normal text-gray6">{description}</div>
            <div className="flex items-center justify-end">
              <Chip label={category} />
              <div className="flex grow items-center justify-end gap-2">
                <Button className="button button-round button-white">
                  <InboxArrowDownIcon className="h-4 w-4" />
                  가져오기 {scrap}
                </Button>
                <Button className="button button-round button-white">
                  <StarIconOutline className="h-4 w-4" />
                  즐겨찾기 {favorite}
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
              <button
                className="
                    flex items-center justify-center gap-1 rounded-xl border border-slate6 bg-bgColor px-1.5 py-1
                    text-xs font-medium text-slate6
                  ">
                <InboxArrowDownIcon className="h-4 w-4" />
                가져오기 {scrap}
              </button>
              <button
                className="
                    flex items-center justify-center gap-1 rounded-xl border border-slate6 bg-bgColor px-1.5 py-1
                    text-xs font-medium text-slate6
                  ">
                <StarIconSolid className="h-4 w-4 text-yellow-300" />
                즐겨찾기 {favorite}
              </button>
            </div>
            <div className="text-xs font-normal text-gray6">{description}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Space
