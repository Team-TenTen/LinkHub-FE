'use client'

import { useTheme } from 'next-themes'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="rounded-md border p-2 text-xs"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      테마 버튼
    </button>
  )
}

export default ThemeButton
