import { Providers } from '@/components'
import Header from '@/components/common/Header/Header'
import ToastContainer from '@/components/common/Toast/ToastContainer'
import { AuthProvider } from '@/lib/contexts/AuthProvider'
import TanstackQueryContext from '@/lib/contexts/TanstackQueryContext'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s • LinkHub',
    default: 'LinkHub',
  },
  description: '링크 아카이빙 및 공유 플랫폼',
  openGraph: {
    title: 'LinkHub',
    description: '링크 아카이빙 및 공유 플랫폼',
    url: 'https://link-hub.site',
    siteName: 'LinkHub',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </head>
      <TanstackQueryContext>
        <AuthProvider>
          <body className="bg-bgColor">
            <Providers>
              <div
                id="root"
                className="relative	mx-auto min-h-screen w-full max-w-[500px] shadow-xl">
                <Header />
                <main className="pt-[53px]">{children}</main>
              </div>
            </Providers>
            <ToastContainer />
          </body>
        </AuthProvider>
      </TanstackQueryContext>
    </html>
  )
}
