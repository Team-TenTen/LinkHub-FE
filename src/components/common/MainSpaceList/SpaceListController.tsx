'use client'

import { useCategoryParam, useSortParam } from '@/hooks'
import { fetchGetSpaces } from '@/services/space/spaces'
import dynamic from 'next/dynamic'
import DeferredComponent from '../DeferedComponent/DeferedComponent'
import MainSpaceSkeleton from './MainSpaceSkeleton'

const DynamicMainSpaceList = dynamic(() => import('./MainSpaceList'), {
  loading: () => (
    <DeferredComponent>
      <MainSpaceSkeleton />
    </DeferredComponent>
  ),
})

const SpaceListController = () => {
  const { sort } = useSortParam('space')
  const { category } = useCategoryParam('all')

  return (
    <DynamicMainSpaceList
      queryKey="main"
      sort={sort ?? ''}
      category={category ?? ''}
      fetchFn={fetchGetSpaces}
    />
  )
}

export default SpaceListController
