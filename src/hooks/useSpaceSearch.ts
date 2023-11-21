import { useCallback, useEffect, useMemo, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { SearchFormValue } from '@/app/(routes)/user/[userId]/space/page'
import { CATEGORIES } from '@/components/common/CategoryList/constants'
import { fetchGetMyFavoriteSpaces } from '@/services/user/profile/route'
import { SpaceResBody } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface UseSpaceSearch {
  setValue: UseFormSetValue<SearchFormValue>
}

const useSpaceSearch = ({ setValue }: UseSpaceSearch) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const categoryIndex = category
    ? Object.values(CATEGORIES['all']).indexOf(category)
    : 0
  const [favoriteSpaces, setFavoriteSpaces] = useState<SpaceResBody[]>([])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleCategoryChange = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      router.replace(
        pathname + '?' + createQueryString('category', e.currentTarget.value),
        { scroll: false },
      )
    },
    [router, pathname, createQueryString],
  )

  const handleKeyWordChange = useCallback(
    ({ keyWord }: { keyWord: string }) => {
      router.replace(pathname + '?' + createQueryString('keyWord', keyWord), {
        scroll: false,
      })
    },
    [router, pathname, createQueryString],
  )

  const onSubmit = useCallback(
    async ({ searchKeyWord }: { searchKeyWord: string }) => {
      handleKeyWordChange({ keyWord: searchKeyWord })
      setValue('keyWord', '')
      const category = searchParams.get('category')
      const keyWord = searchParams.get('keyWord')
      console.log(category, keyWord)

      await fetchGetMyFavoriteSpaces({
        pageNumber: 0,
        pageSize: 10,
        keyWord: keyWord ? keyWord : '',
        filter:
          category === null || category === 'all'
            ? ''
            : category?.toUpperCase(),
      }).then((res) => {
        setFavoriteSpaces(res.responses)
      })
    },
    [handleKeyWordChange, searchParams, setValue],
  )

  return {
    favoriteSpaces,
    categoryIndex,
    handleCategoryChange,
    onSubmit,
  }
}

export default useSpaceSearch
