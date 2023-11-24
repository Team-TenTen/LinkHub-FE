'use client'

import React from 'react'
import { useCategoryParam, useSortParam } from '@/hooks'
import { fetchGetSpaces } from '@/services/space/spaces'
import { SpaceList } from '..'

const SpaceListController = () => {
  const { sort } = useSortParam('space')
  const { category } = useCategoryParam('all_follow')

  return (
    <SpaceList
      queryKey="main"
      sort={sort ?? ''}
      category={category ?? ''}
      fetchFn={fetchGetSpaces}
    />
  )
}

export default SpaceListController
