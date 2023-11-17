import { useCallback, useEffect, useState } from 'react'
import { CATEGORIES } from '@/components/common/CategoryList/constants'
import { DROPDOWN_OPTIONS } from '@/components/common/Dropdown/constants'
import { mock_LinkData } from '@/data'
import { fetchGetSpaces } from '@/services/space/spaces'
import { SpaceResBody } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useHome = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort')
  const category = searchParams.get('category')
  const sortIndex = sort
    ? Object.values(DROPDOWN_OPTIONS['space']).indexOf(sort)
    : 0
  const categoryIndex = category
    ? Object.values(CATEGORIES['all_follow']).indexOf(category)
    : 0
  const links = mock_LinkData.slice(0, 5)
  const [spaces, setSpaces] = useState<SpaceResBody[]>([])

  useEffect(() => {
    const category = searchParams.get('category')
    const sort = searchParams.get('sort')

    if (category === 'follow') {
      // TODO: 팔로잉 중인 유저 스페이스 불러오기
      setSpaces([])
    } else {
      fetchGetSpaces({
        pageNumber: 0,
        pageSize: 10,
        sort: sort === 'favorite' ? 'favorite_count' : 'created_at',
        filter:
          category === null || category === 'all'
            ? ''
            : category?.toUpperCase(),
      }).then((res) => {
        setSpaces(res.responses)
      })
    }
  }, [searchParams])

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
