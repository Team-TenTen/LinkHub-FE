'use client'

import React from 'react'
import { useCategoryParam, useSortParam } from '@/hooks'
import { CategoryList, Dropdown } from '../..'

const SpaceCategory = () => {
  const { sortIndex, handleSortChange } = useSortParam('space')
  const { categoryIndex, handleCategoryChange } = useCategoryParam('all_follow')
  return (
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
  )
}

export default SpaceCategory
