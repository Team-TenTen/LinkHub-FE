'use client'

import { CategoryList, Dropdown, Spinner } from '@/components'
import FloatingButton from '@/components/FloatingButton/FloatingButton'
// import PopularLinkList from '@/components/PopularLinkList/PopularLinkList'
import PopularLinkSkeleton from '@/components/PopularLinkList/PopularLinkSkeleton'
import DeferredComponent from '@/components/common/DeferedComponent/DeferedComponent'
// import MainSpaceList from '@/components/common/MainSpaceList/MainSpaceList'
import { useCategoryParam, useSortParam } from '@/hooks'
import { fetchGetSpaces } from '@/services/space/spaces'
import dynamic from 'next/dynamic'

const DynamicPopularLinkList = dynamic(
  () => import('@/components/PopularLinkList/PopularLinkList'),
  {
    loading: () => (
      <DeferredComponent>
        <PopularLinkSkeleton />
      </DeferredComponent>
    ),
  },
)
const DynamicMainSpaceList = dynamic(
  () => import('@/components/common/MainSpaceList/MainSpaceList'),
  {
    loading: () => (
      <DeferredComponent>
        <Spinner />
      </DeferredComponent>
    ),
  },
)

export default function Home() {
  const { sort, sortIndex, handleSortChange } = useSortParam('space')
  const { category, categoryIndex, handleCategoryChange } =
    useCategoryParam('all')

  return (
    <>
      <section className="px-4 pb-8">
        <h2 className="py-4 font-bold text-gray9">인기있는 링크</h2>
        <div className="min-h-[101.5px]">
          {/* <PopularLinkList /> */}
          <DynamicPopularLinkList />
        </div>
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
            type="all"
            defaultIndex={categoryIndex}
            onChange={handleCategoryChange}
          />
        </div>
        {/* <MainSpaceList
          queryKey="main"
          sort={sort ?? ''}
          category={category ?? ''}
          fetchFn={fetchGetSpaces}
        /> */}
        <DynamicMainSpaceList
          queryKey="main"
          sort={sort ?? ''}
          category={category ?? ''}
          fetchFn={fetchGetSpaces}
        />
      </section>
      <FloatingButton />
    </>
  )
}
