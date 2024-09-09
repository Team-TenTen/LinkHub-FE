'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>
}

export default Providers
