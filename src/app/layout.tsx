import { Providers, ThemeButton } from '@/components'
import { cls } from '@/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={cls('bg-bgColor text-textColor', inter.className)}>
        <Providers>
          <div
            id="root"
            className="relative mx-auto w-full max-w-[500px]">
            {children}
          </div>
          <ThemeButton />
        </Providers>
      </body>
    </html>
  )
}
