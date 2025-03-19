import { useEffect, useState } from 'react'
import { QUERY_KEYS } from '@/constants'
import { validateToken } from '@/services/auth/useAuth'
import { UserProfileResBody } from '@/types'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'

export const useValidate = () => {
  const token = Cookies.get('Auth-token')
  return useQuery({
    queryKey: [QUERY_KEYS.VALIDATE_TOKEN, token],
    queryFn: async () => {
      const res = await validateToken()
      if (!res) {
        Cookies.remove('Auth-token')
        alert('올바르지 않은 토큰입니다. 다시 로그인해주세요.')
      }

      return res
    },
    enabled: !!token,
  })
}

export const useCurrentUser = () => {
  const pathname = usePathname()
  const validateQuery = useValidate()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!Cookies.get('Auth-token'),
  )
  const [currentUser, setCurrentUser] = useState<
    UserProfileResBody | undefined
  >(undefined)

  useEffect(() => {
    if (validateQuery.isError) {
      setIsLoggedIn(false)
      setCurrentUser(undefined)
    } else if (validateQuery.data) {
      setIsLoggedIn(true)
      setCurrentUser(validateQuery.data)
    }
  }, [validateQuery, pathname])

  return { currentUser, isLoggedIn }
}
