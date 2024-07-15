import { Providers } from '@/components'
import Header from '@/components/common/Header/Header'
import ToastContainer from '@/components/common/Toast/ToastContainer'
import { AuthProvider } from '@/lib/contexts/AuthProvider'
import TanstackQueryContext from '@/lib/contexts/TanstackQueryContext'
import { Metadata } from 'next'
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
      'https://linkhub-s3.s3.ap-northeast-2.amazonaws.com/linkhub-og-image.png',
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <TanstackQueryContext>
        <AuthProvider>
          <body className="bg-bgColor">
            <Providers>
              <div
                id="root"
                className="relative	mx-auto min-h-screen w-full pb-4 shadow-xl">
                <Header />
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
