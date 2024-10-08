import { Suspense } from 'react'
import { Providers } from '@/components'
import Header from '@/components/common/Header/Header'
import ToastContainer from '@/components/common/Toast/ToastContainer'
import { AuthProvider } from '@/lib/contexts/AuthProvider'
import TanstackQueryContext from '@/lib/contexts/TanstackQueryContext'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://link-hub.site'),
  title: {
    template: '%s • LinkHub',
    default: 'LinkHub',
  },
  description: '링크 아카이빙 및 공유 플랫폼',
  themeColor: '#50b584',
  icons: {
    other: [
      {
        url: '/images/icons/splashscreens/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
    ],
  },
  viewport:
    'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0',
  openGraph: {
    title: 'LinkHub',
    description: '링크 아카이빙 및 공유 플랫폼',
    url: 'https://link-hub.site',
    siteName: 'LinkHub',
    locale: 'ko_KR',
    type: 'website',
    images: [
      'https://linkhub-s3-2025.s3.ap-northeast-2.amazonaws.com/linkhub-og-image.png',
    ],
  },
  manifest: '/manifest.json',
}

const pretendard = localFont({
  src: '../static/font/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <TanstackQueryContext>
        <AuthProvider>
          <body className={`bg-bgColor ${pretendard.variable}`}>
            <Providers>
              <div
                id="root"
                className="relative mx-auto min-h-screen w-full pb-4 shadow-xl">
                <Suspense>
                  <Header />
                </Suspense>
                <main className="pt-[53px]">{children}</main>
              </div>
              <ToastContainer />
            </Providers>
          </body>
        </AuthProvider>
      </TanstackQueryContext>
    </html>
  )
}
