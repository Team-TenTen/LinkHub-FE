'use client'

import { Fragment } from 'react'
import { NONE_SEARCH_RESULT } from '@/components/SpaceList/constants'
import useMainSpacesQuery from '@/components/SpaceList/hooks/useMainSpacesQuery'
import { CATEGORIES_RENDER } from '@/constants'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { SearchSpaceReqBody, SpaceResBody } from '@/types'
import Button from '../Button/Button'
import DeferredComponent from '../DeferedComponent/DeferedComponent'
import { MORE_TEXT } from '../LinkList/constants'
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
      <ul
        className=" mb-4 grid gap-4 gap-y-2 px-4 pt-2"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
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
      </ul>
      {hasNextPage && (
        <div className="flex justify-center">
          <div
            ref={target}
            className="button-md button-round button-white flex w-40 cursor-pointer border"
            onClick={() => fetchNextPage()}>
            {MORE_TEXT}
          </div>
        </div>
      )}
    </>
  )
}

export default MainSpaceList
