import { useCallback } from 'react'
import { CATEGORIES } from '@/components/common/CategoryList/constants'
import { DROPDOWN_OPTIONS } from '@/components/common/Dropdown/constants'
import { mock_LinkData, mock_spacesData } from '@/data'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useHome = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort')
  const category = searchParams.get('category')
  const categoryIndex = category
    ? CATEGORIES['all_follow'].indexOf(category)
    : 0
  const sortIndex = sort
    ? Object.values(DROPDOWN_OPTIONS['space']).indexOf(sort)
    : 0
  const links = mock_LinkData.slice(0, 5)
  const spaces = mock_spacesData

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleSortChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.replace(
      pathname + '?' + createQueryString('sort', e.currentTarget.value),
      { scroll: false },
    )
  }

  const handleCategoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.replace(
      pathname + '?' + createQueryString('category', e.currentTarget.value),
      { scroll: false },
    )
  }

  return {
    links,
    spaces,
    sortIndex,
    categoryIndex,
    handleSortChange,
    handleCategoryChange,
  }
}

export default useHome
