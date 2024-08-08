'use client'

import { useSortParam } from '@/hooks'
import Dropdown from './Dropdown'

const DropdownController = () => {
  const { sortIndex, handleSortChange } = useSortParam('space')

  return (
    <Dropdown
      type="space"
      placement="right"
      defaultIndex={sortIndex}
      onChange={handleSortChange}
    />
  )
}

export default DropdownController
