import { DROPDOWN_OPTIONS } from '@/components/common/Dropdown/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useQueryString from './useQueryString'

const useSortParam = (type: keyof typeof DROPDOWN_OPTIONS) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') || undefined
  const sortIndex = sort
    ? Object.values(DROPDOWN_OPTIONS[type]).indexOf(sort)
    : 0
  const { createQueryString } = useQueryString(searchParams)

  const handleSortChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.replace(
      pathname + '?' + createQueryString('sort', e.currentTarget.value),
      { scroll: false },
    )
  }

  return {
    sort,
    sortIndex,
    handleSortChange,
  }
}

export default useSortParam
