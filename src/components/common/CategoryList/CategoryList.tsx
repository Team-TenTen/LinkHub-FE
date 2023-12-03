'use client'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
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

  return horizontal ? (
    <Swiper
      direction="horizontal"
      slidesPerView="auto"
      spaceBetween={6}
      freeMode={true}
      modules={[FreeMode]}
      className="category-swiper">
      {categoryKeys.map((category, i) => (
        <SwiperSlide key={i}>
          <CategoryListItem
            label={category}
            value={categoryValues[i]}
            active={index === i}
            as="link"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <ul className="flex w-full flex-wrap gap-1.5">
      {categoryKeys.map((category, i) => (
        <li
          className="shrink-0"
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
