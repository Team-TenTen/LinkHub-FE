'use client'

import { CategoryList, Dropdown, LinkItem } from '@/components'
import Space from '@/components/common/Space/Space'
import { CATEGORIES_RENDER } from '@/constants'
import useHome from '@/hooks/useHome'

export default function Home() {
  const {
    links,
    spaces,
    sortIndex,
    categoryIndex,
    handleSortChange,
    handleCategoryChange,
  } = useHome()
  return (
    <>
      <section className="px-4 pb-10">
        <h2 className="py-4 font-bold text-gray9">인기있는 링크</h2>
        {links.map((link) => (
          <LinkItem
            title={link.title}
            url={link.url}
            tag={link.tag}
            likes={link.likes}
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
        <div className="flex flex-col gap-y-2 px-4 pt-2">
          {spaces?.map((space) => (
            <Space
              userName={space.userName}
              spaceId={space.spaceId}
              type="Card"
              spaceName={space.spaceName}
              spaceImage={space.spaceImagePath}
              description={space.description}
              category={CATEGORIES_RENDER[space.category]}
              scrap={space.scrapCount}
              favorite={space.favoriteCount}
              key={space.spaceId}
            />
          ))}
        </div>
      </section>
    </>
  )
}
