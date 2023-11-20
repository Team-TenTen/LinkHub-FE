import { CATEGORIES } from '@/components/common/CategoryList/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useQueryString from './useQueryString'

const useCategoryParam = (type: keyof typeof CATEGORIES) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const categoryIndex = category
    ? Object.values(CATEGORIES[type]).indexOf(category)
    : 0
  const { createQueryString } = useQueryString(searchParams)

  const handleCategoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.replace(
      pathname + '?' + createQueryString('category', e.currentTarget.value),
      { scroll: false },
    )
  }

  return {
    category,
    categoryIndex,
    handleCategoryChange,
  }
}

export default useCategoryParam
