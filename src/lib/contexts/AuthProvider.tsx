'use client'

import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { UserProfileResBody } from '@/types'
import { usePathname, useRouter } from 'next/navigation'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<{
  currentUser: UserProfileResBody | undefined
  isLoggedIn: boolean
}>({
  currentUser: undefined,
  isLoggedIn: false,
})

const authNeededPages = [
  '/space/create',
  '/space/:spaceId/setting',
  '/user/setting',
]
const authProhibitedPages = ['/login', '/register']

export function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, isLoggedIn } = useCurrentUser()

  const contextValue = useMemo(
    () => ({ currentUser, isLoggedIn }),
    [currentUser, isLoggedIn],
  )

  useEffect(() => {
    //  로그인이 되어있으면 로그인, 회원가입 페이지 접근 불가
    if (isLoggedIn && authProhibitedPages.includes(pathname)) {
      router.push('/')
    }
    if (!isLoggedIn && authNeededPages.includes(pathname)) {
      alert('로그인이 필요합니다.')
      router.push('/login')
    }
  }, [isLoggedIn, pathname, router])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
