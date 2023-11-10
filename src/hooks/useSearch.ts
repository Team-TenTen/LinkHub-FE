import { useCallback, useMemo } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { SearchFormValue } from '@/app/(routes)/user/[userId]/space/page'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface UseSearchProps {
  setValue: UseFormSetValue<SearchFormValue>
}

const useSearch = ({ setValue }: UseSearchProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      params.set(name, value)
      return params.toString()
    },
    [params],
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

  const onSubmit = useCallback(
    ({ keyword }: { keyword: string }) => {
      setValue('keyword', '')
      router.replace(pathname + '?' + createQueryString('keyword', keyword), {
        scroll: false,
      })
    },
    [router, pathname, createQueryString, setValue],
  )

  return {
    handleCategoryChange,
    onSubmit,
  }
}

export default useSearch
