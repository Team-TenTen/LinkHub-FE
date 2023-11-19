'use client'

import { Fragment } from 'react'
import { SpaceResBody } from '@/types'
import Space from '../common/Space/Space'
import useSpacesQuery from './hooks/useSpacesQuery'

export interface SpaceListProps {
  sort?: string
  category: string
  keyword?: string
}

const SpaceList = ({ sort, category, keyword }: SpaceListProps) => {
  const { spaces, ref } = useSpacesQuery({ sort, category })

  return (
    <>
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
        <div ref={ref}></div>
      </ul>
    </>
  )
}

export default SpaceList
