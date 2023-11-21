import { useCallback } from 'react'
import { ReadonlyURLSearchParams } from 'next/navigation'

const useQueryString = (searchParams: ReadonlyURLSearchParams) => {
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return { createQueryString }
}

export default useQueryString
