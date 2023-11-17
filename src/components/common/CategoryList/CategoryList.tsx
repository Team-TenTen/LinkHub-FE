'use client'

import { cls } from '@/utils'
import CategoryListItem from './CategoryListItem'
import { CATEGORIES } from './constants'
import useCategoryList from './hooks/useCategoryList'

export interface CategoryListProps {
  type?: 'all' | 'all_follow' | 'default'
  horizontal?: boolean
  defaultIndex?: number
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CategoryList = ({
  type = 'default',
  horizontal = true,
  defaultIndex,
  onChange,
}: CategoryListProps) => {
  const categoryKeys = Object.keys(CATEGORIES[type])
  const categoryValues = Object.values(CATEGORIES[type])
  const { index, handleClick } = useCategoryList({
    defaultIndex,
    onChange,
  })

  return (
    <ul
      className={cls(
        'flex w-full gap-1.5',
        horizontal
          ? 'horizontal-scroll snap-x scroll-px-4 overflow-x-auto scroll-smooth py-4'
          : 'flex-wrap',
      )}>
      {categoryKeys.map((category, i) => (
        <li
          className={cls(
            'shrink-0',
            horizontal && 'snap-end first:pl-4 last:pr-4',
          )}
          key={category}>
          <CategoryListItem
            label={category}
            value={categoryValues[i]}
            active={index === i}
            onClick={(e) => handleClick(e, i)}
          />
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
