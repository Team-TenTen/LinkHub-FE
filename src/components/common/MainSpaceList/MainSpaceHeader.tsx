'use client'

import { Suspense } from 'react'
import CategoryListController from '../CategoryList/CategoryListController'
import DropdownController from '../Dropdown/DropdownController'

const MainSpaceHeader = () => {
  return (
    <div className="sticky top-[53px] z-40 bg-bgColor">
      <div className="flex items-center justify-between px-4 pt-2">
        <h2 className="font-bold text-gray9">스페이스 모음</h2>
        <Suspense>
          <DropdownController />
        </Suspense>
      </div>
      <Suspense>
        <CategoryListController />
      </Suspense>
    </div>
  )
}

export default MainSpaceHeader
