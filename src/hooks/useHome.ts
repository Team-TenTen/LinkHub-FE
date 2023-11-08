import { useCallback } from 'react'
import { mock_LinkData, mock_spacesData } from '@/data'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useHome = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
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

  return { links, spaces, handleSortChange, handleCategoryChange }
}

export default useHome
