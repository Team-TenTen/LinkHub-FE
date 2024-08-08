'use client'

import dynamic from 'next/dynamic'
import DeferredComponent from '../common/DeferedComponent/DeferedComponent'
import PopularLinkSkeleton from './PopularLinkSkeleton'

const DynamicPopularLinkList = dynamic(() => import('./PopularLinkList'), {
  loading: () => (
    <DeferredComponent>
      <PopularLinkSkeleton />
    </DeferredComponent>
  ),
  ssr: false,
})

const PopularLinkListController = () => {
  return (
    <section className="px-4 pb-8">
      <h2 className="py-4 font-bold text-gray9">인기있는 링크</h2>
      <div className="min-h-[101.5px]">
        <DynamicPopularLinkList />
      </div>
    </section>
  )
}

export default PopularLinkListController
