'use client'

import { useRef } from 'react'
import { cls } from '@/utils'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'

const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isMounted = useRef(false)

  const handleClick = () => {
    if (!isMounted.current) {
      isMounted.current = true
    }
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      className="rounded-full border border-slate3 p-2 text-xs"
      onClick={handleClick}>
      {theme === 'dark' ? (
        <MoonIcon
          className={cls(
            'h-5 w-5',
            isMounted.current && 'animate-darkModeSpin',
          )}
        />
      ) : (
        <SunIcon
          className={cls(
            'h-5 w-5',
            isMounted.current && 'animate-darkModeSpin',
          )}
        />
      )}
    </button>
  )
}

export default ThemeButton
