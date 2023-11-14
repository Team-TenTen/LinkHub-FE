'use client'

import { CategoryList, Dropdown } from '@/components'
import Space from '@/components/common/Space/Space'
import User from '@/components/common/User/User'
import useSearch from '@/hooks/useSearch'
import { cls } from '@/utils'

const SearchPage = () => {
  const {
    target,
    sortIndex,
    categoryIndex,
    keyword,
    result,
    handleSortChange,
    handleCategoryChange,
  } = useSearch()
  return (
    <>
      <div
        className={cls(
          'flex items-center px-4',
          target === 'space' ? 'pt-4' : 'py-4',
        )}>
        <h2 className="grow overflow-hidden text-ellipsis whitespace-nowrap pr-2 font-bold text-gray9">
          &apos;{keyword}&apos; 에 대한{' '}
          {target === 'space' ? '스페이스' : target === 'user' ? '유저' : ''}{' '}
          검색 결과
        </h2>
        {target === 'space' && (
          <div className="shrink-0">
            <Dropdown
              type="space"
              placement="right"
              defaultIndex={sortIndex}
              onChange={handleSortChange}
            />
          </div>
        )}
      </div>
      {target === 'space' && (
        <CategoryList
          type="all"
          defaultIndex={categoryIndex}
          onChange={handleCategoryChange}
        />
      )}
      <section className="flex flex-col gap-y-2 px-4">
        {result.spaces?.map((space) => (
          <Space
            type="Card"
            spaceId={space.spaceId}
            userName={space.userName}
            spaceName={space.spaceName}
            spaceImage={space.spaceImage}
            description={space.description}
            category={space.category}
            scrap={space.scrap}
            favorite={space.favorite}
            key={space.spaceId}
          />
        ))}
        {result.users?.map((user) => (
          <User
            id={user.id}
            name={user.name}
            profile={user.profile}
            key={user.id}
          />
        ))}
      </section>
    </>
  )
}

export default SearchPage
