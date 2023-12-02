'use client'

import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { UserProfileResBody } from '@/types'

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

export function AuthProvider({ children }: AuthProviderProps) {
  const { currentUser, isLoggedIn } = useCurrentUser()

  const contextValue = useMemo(
    () => ({ currentUser, isLoggedIn }),
    [currentUser, isLoggedIn],
  )

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
