'use client'

import { useTheme } from 'next-themes'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="border p-2 rounded-md fixed bottom-2 right-2 text-xs"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      테마 버튼
    </button>
  )
}

export default ThemeButton
