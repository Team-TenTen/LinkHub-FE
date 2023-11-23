'use client'

import { CategoryList, Dropdown, LinkItem, SpaceList } from '@/components'
import { mock_LinkData } from '@/data'
import { useCategoryParam, useSortParam } from '@/hooks'
import { fetchGetSpaces } from '@/services/space/spaces'

export default function Home() {
  const links = mock_LinkData.slice(0, 5)
  const { sort, sortIndex, handleSortChange } = useSortParam('space')
  const { category, categoryIndex, handleCategoryChange } =
    useCategoryParam('all_follow')

  return (
    <>
      <section className="px-4 pb-10">
        <h2 className="py-4 font-bold text-gray9">인기있는 링크</h2>
        {links.map((link) => (
          <LinkItem
            linkId={link.id}
            title={link.title}
            url={link.url}
            tagName={link.tagName}
            tagColor={link.tagColor}
            isInitLiked={link.isLiked}
            likeInitCount={link.likeCount}
            key={link.id}
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
