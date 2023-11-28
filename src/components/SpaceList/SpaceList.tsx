'use client'

import { Fragment } from 'react'
import { CATEGORIES_RENDER } from '@/constants'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { SearchSpaceReqBody, SpaceResBody } from '@/types'
import Space from '../common/Space/Space'
import { NONE_SEARCH_RESULT } from './constants'
import useSpacesQuery from './hooks/useSpacesQuery'

export interface SpaceListProps {
  memberId?: number
  queryKey: string
  sort?: string
  category: string
  keyword?: string
  fetchFn: ({
    memberId,
    pageNumber,
    pageSize,
    sort,
    filter,
    keyWord,
  }: SearchSpaceReqBody) => Promise<any>
}

const SpaceList = ({
  queryKey,
  memberId,
  sort,
  category,
  keyword,
  fetchFn,
}: SpaceListProps) => {
  const { spaces, fetchNextPage, hasNextPage } = useSpacesQuery({
    queryKey,
    memberId,
    sort,
    category,
    keyword,
    fetchFn,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return (
    <ul className="flex flex-col gap-y-2 px-4 pt-2">
      {spaces?.pages[0].responses.length ? (
        spaces?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.responses?.map((space: SpaceResBody) => (
              <li key={space.spaceId}>
                <Space
                  userName={space.ownerNickName}
                  spaceId={space.spaceId}
                  type="Card"
                  spaceName={space.spaceName}
                  spaceImage={space.spaceImagePath}
                  description={space.description}
                  category={CATEGORIES_RENDER[space.category]}
                  scrap={space.scrapCount}
                  favorite={space.favoriteCount}
                />
              </li>
            ))}
          </Fragment>
        ))
      ) : (
        <div className="flex justify-center text-base text-gray9">
          {NONE_SEARCH_RESULT}
        </div>
      )}

      <div ref={target}></div>
    </ul>
  )
}

export default SpaceList
