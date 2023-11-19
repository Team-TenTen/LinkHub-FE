'use client'

import { Fragment } from 'react'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { SearchSpaceReqBody, SpaceResBody } from '@/types'
import Space from '../common/Space/Space'
import useSpacesQuery from './hooks/useSpacesQuery'

export interface SpaceListProps {
  queryKey: string
  sort?: string
  category: string
  keyword?: string
  fetchFn: ({
    pageNumber,
    pageSize,
    sort,
    filter,
    keyWord,
  }: SearchSpaceReqBody) => Promise<any>
}

const SpaceList = ({
  queryKey,
  sort,
  category,
  keyword,
  fetchFn,
}: SpaceListProps) => {
  const { spaces, fetchNextPage, hasNextPage } = useSpacesQuery({
    queryKey,
    sort,
    category,
    keyword,
    fetchFn,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return (
    <ul className="flex flex-col gap-y-2 px-4 pt-2">
      {spaces?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.responses?.map((space: SpaceResBody) => (
            <li key={space.spaceId}>
              <Space
                userName={space.userName}
                spaceId={space.spaceId}
                type="Card"
                spaceName={space.spaceName}
                spaceImage={space.spaceImagePath}
                description={space.description}
                category={space.category}
                scrap={space.scrapCount}
                favorite={space.favoriteCount}
              />
            </li>
          ))}
        </Fragment>
      ))}
      <div ref={target}></div>
    </ul>
  )
}

export default SpaceList
