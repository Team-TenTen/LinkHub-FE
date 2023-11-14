import { useCallback } from 'react'
import { CATEGORIES } from '@/components/common/CategoryList/constants'
import { DROPDOWN_OPTIONS } from '@/components/common/Dropdown/constants'
import { mock_spacesData, mock_usersData } from '@/data'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const target = searchParams.get('target')
  const sort = searchParams.get('sort')
  const category = searchParams.get('category')
  const sortIndex = sort
    ? Object.values(DROPDOWN_OPTIONS['space']).indexOf(sort)
    : 0
  const categoryIndex = category ? CATEGORIES['all'].indexOf(category) : 0
  const keyword = searchParams.get('keyword')
  const result =
    target === 'space'
      ? { spaces: mock_spacesData, users: [] }
      : target === 'user'
      ? { spaces: [], users: mock_usersData }
      : {}

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
    )
  }

  const handleCategoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.replace(
      pathname + '?' + createQueryString('category', e.currentTarget.value),
    )
  }

  return {
    target,
    sortIndex,
    categoryIndex,
    keyword,
    result,
    handleSortChange,
    handleCategoryChange,
  }
}

export default useSearch
