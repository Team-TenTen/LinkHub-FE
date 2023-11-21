'use client'

import { CategoryList, Dropdown, SpaceList } from '@/components'
import User from '@/components/common/User/User'
import { mock_usersData } from '@/data'
import { useCategoryParam, useSortParam } from '@/hooks'
import { fetchSearchSpaces } from '@/services/space/spaces'
import { cls } from '@/utils'
import { useSearchParams } from 'next/navigation'

const SearchPage = () => {
  const { sort, sortIndex, handleSortChange } = useSortParam('space')
  const { category, categoryIndex, handleCategoryChange } =
    useCategoryParam('all')
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')
  const target = searchParams.get('target')
  const users = mock_usersData

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
        {target === 'space' && (
          <SpaceList
            queryKey="search"
            sort={sort ?? ''}
            category={category ?? ''}
            keyword={keyword ?? ''}
            fetchFn={fetchSearchSpaces}
          />
        )}
        {target === 'user' &&
          users.map((user) => (
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
