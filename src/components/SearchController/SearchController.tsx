'use client'

import { CategoryList, Dropdown, SpaceList } from '@/components'
import UserList from '@/components/UserList/UserList'
import { useCategoryParam, useSortParam } from '@/hooks'
import { fetchSearchSpaces } from '@/services/space/spaces'
import { fetchSearchUsers } from '@/services/user/search/search'
import { cls } from '@/utils'
import { useSearchParams } from 'next/navigation'

const SearchController = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')
  const target = searchParams.get('target')
  const { sort, sortIndex, handleSortChange } = useSortParam('space')
  const { category, categoryIndex, handleCategoryChange } =
    useCategoryParam('all')

  return (
    <>
      <div className="sticky top-[53px] z-40 bg-bgColor">
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
      </div>
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
        {target === 'user' && (
          <UserList
            keyword={keyword ?? ''}
            fetchFn={fetchSearchUsers}
          />
        )}
      </section>
    </>
  )
}

export default SearchController
