'use client'

import { Fragment } from 'react'
import { NONE_SEARCH_RESULT } from '@/components/SpaceList/constants'
import useMainSpacesQuery from '@/components/SpaceList/hooks/useMainSpacesQuery'
import { CATEGORIES_RENDER } from '@/constants'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { SearchSpaceReqBody, SpaceResBody } from '@/types'
import DeferredComponent from '../DeferedComponent/DeferedComponent'
import Space from '../Space/Space'
import Spinner from '../Spinner/Spinner'

export interface SpaceListProps {
  memberId?: number
  queryKey: string
  sort?: string
  category: string
  keyword?: string
  fetchFn: ({
    memberId,
    pageNumber,
    lastFavoriteCount,
    lastSpaceId,
    pageSize,
    sort,
    filter,
    keyWord,
  }: SearchSpaceReqBody) => Promise<any>
}

const MainSpaceList = ({
  queryKey,
  memberId,
  sort,
  category,
  keyword,
  fetchFn,
}: SpaceListProps) => {
  const { spaces, fetchNextPage, hasNextPage, isSpacesLoading } =
    useMainSpacesQuery({
      queryKey,
      memberId,
      sort,
      category,
      keyword,
      fetchFn,
    })

  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return isSpacesLoading ? (
    <DeferredComponent>
      <Spinner />
    </DeferredComponent>
  ) : (
    <>
      <ul className="flex flex-col gap-y-2 px-4 pt-2">
        {spaces?.pages[0].responses.length
          ? spaces?.pages.map((group, i) => (
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
          : !isSpacesLoading && (
              <div className="py-5 text-center text-sm font-medium text-gray9">
                {NONE_SEARCH_RESULT}
              </div>
            )}

        <div ref={target}></div>
      </ul>
    </>
  )
}

export default MainSpaceList
