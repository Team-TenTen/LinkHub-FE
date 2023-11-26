'use client'

import { CategoryList, Dropdown, LinkItem, SpaceList } from '@/components'
import { ChipColors } from '@/components/common/Chip/Chip'
import { useCategoryParam, useSortParam } from '@/hooks'
import useGetPopularLinks from '@/hooks/useGetPopularLinks'
import { fetchGetSpaces } from '@/services/space/spaces'
import { PopularLinkResBody } from '@/types'

export default function Home() {
  const links = useGetPopularLinks()
  const { sort, sortIndex, handleSortChange } = useSortParam('space')
  const { category, categoryIndex, handleCategoryChange } =
    useCategoryParam('all_follow')

  return (
    <>
      <section className="px-4 pb-10">
        <h2 className="py-4 font-bold text-gray9">인기있는 링크</h2>
        {links &&
          links.map((link: PopularLinkResBody) => (
            <LinkItem
              linkId={link.linkId}
              title={link.title}
              url={link.url}
              tagName={link.tagName}
              tagColor={link.tagColor as ChipColors}
              isInitLiked={link.isLiked}
              likeInitCount={link.likeCount}
              key={link.linkId}
            />
          ))}
      </section>
      <section>
        <div className="sticky top-[53px] z-40 bg-bgColor">
          <div className="flex items-center justify-between px-4 pt-2">
            <h2 className="font-bold text-gray9">스페이스 모음</h2>
            <Dropdown
              type="space"
              placement="right"
              defaultIndex={sortIndex}
              onChange={handleSortChange}
            />
          </div>
          <CategoryList
            type="all_follow"
            defaultIndex={categoryIndex}
            onChange={handleCategoryChange}
          />
        </div>
        <SpaceList
          queryKey="main"
          sort={sort ?? ''}
          category={category ?? ''}
          fetchFn={fetchGetSpaces}
        />
      </section>
    </>
  )
}
