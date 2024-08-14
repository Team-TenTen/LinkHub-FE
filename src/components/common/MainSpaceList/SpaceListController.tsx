// 'use client'
import { useCategoryParam, useSortParam } from '@/hooks'
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
  return <DynamicMainSpaceList />
}

export default SpaceListController
