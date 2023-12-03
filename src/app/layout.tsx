import { Providers } from '@/components'
import Header from '@/components/common/Header/Header'
import ToastContainer from '@/components/common/Toast/ToastContainer'
import { AuthProvider } from '@/lib/contexts/AuthProvider'
import TanstackQueryContext from '@/lib/contexts/TanstackQueryContext'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://link-hub.site'),
  title: {
    template: '%s • LinkHub',
    default: 'LinkHub',
  },
  description: '링크 아카이빙 및 공유 플랫폼',
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
      'https://team-10-bucket.s3.ap-northeast-2.amazonaws.com/linkhub-og-image.png',
    ],
  },
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
                className="relative	mx-auto min-h-screen w-full max-w-[500px] shadow-xl">
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
