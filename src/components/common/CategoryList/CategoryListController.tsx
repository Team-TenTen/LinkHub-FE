import { useCategoryParam } from '@/hooks'
import CategoryList from './CategoryList'

const CategoryListController = () => {
  const { categoryIndex, handleCategoryChange } = useCategoryParam('all')

  return (
    <CategoryList
      type="all"
      defaultIndex={categoryIndex}
      onChange={handleCategoryChange}
    />
  )
}

export default CategoryListController
