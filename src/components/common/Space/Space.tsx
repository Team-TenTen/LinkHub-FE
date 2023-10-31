import { InboxArrowDownIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

interface SpaceProps {
  type: 'Card' | 'Header'
}

const Space = ({ type }: SpaceProps) => {
  return (
    <>
      {type === 'Card' ? (
        <div className="flex gap-3 rounded-md border border-slate3 p-3">
          <div className="items-center justify-center">
            <Image
              className="h-20 w-20 rounded-full border border-slate-300 object-cover"
              src="/TestImage.svg"
              width={80}
              height={80}
              alt="space-image"
            />
          </div>
          <div className="flex grow flex-col justify-center gap-1">
            <div className="text-sm font-bold text-gray-900">SpaceName</div>
            <div className="text-xs font-normal text-gray-600">Description</div>
            <div className="flex items-center justify-end">
              <div className="rounded-xl bg-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-900">
                카테고리
              </div>
              <div className="flex grow items-center justify-end gap-2">
                <button
                  className="
                flex items-center justify-center gap-1 rounded-xl border border-slate6 bg-bgColor px-1.5 py-1
                text-xs font-medium text-slate6
              ">
                  <InboxArrowDownIcon className="h-4 w-4" />
                  가져오기
                </button>
                <button
                  className="
                flex items-center justify-center gap-1 rounded-xl border border-slate6 bg-bgColor px-1.5 py-1
                text-xs font-medium text-slate6
              ">
                  <StarIcon className="h-4 w-4 text-yellow-300" />
                  즐겨찾기
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-3 py-1.5">
          <div>
            <Image
              className="w-[500px]"
              src="TestImage.svg"
              width={500}
              height={188}
              alt="space-image"
            />
            <div>category</div>
            <div>SpaceName</div>
            <div>
              <button
                className="
                flex items-center justify-center gap-1 rounded-xl border border-slate6 bg-bgColor px-1.5 py-1
                text-xs font-medium text-slate6
              ">
                <InboxArrowDownIcon className="h-4 w-4" />
                가져오기
              </button>
              <button
                className="
                flex items-center justify-center gap-1 rounded-xl border border-slate6 bg-bgColor px-1.5 py-1
                text-xs font-medium text-slate6
              ">
                <StarIcon className="h-4 w-4 text-yellow-300" />
                즐겨찾기
              </button>
            </div>
            <div>Description</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Space
