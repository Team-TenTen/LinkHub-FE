'use client'

import { useEffect } from 'react'
import { LinkIcon } from '@heroicons/react/20/solid'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '../common/Button/Button'

const Login = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('jwt')) {
      Cookies.set('Auth-token', searchParams.get('jwt') || '')
      router.replace('/')
    } else if (searchParams.get('socialId')) {
      Cookies.set('Social-Id', searchParams.get('socialId') || '', {
        expires: 1 / 288,
      })
      Cookies.set('Provider', searchParams.get('provider') || '', {
        expires: 1 / 288,
      })
      router.replace('/register')
    }
  }, [router, searchParams])

  return (
    <div className="flex h-screen translate-y-[-9%] flex-col justify-center gap-10 pl-4 pr-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <LinkIcon className="h-10 w-10 text-emerald5" />
        </div>
        <div className="mb-4 text-4xl font-normal leading-10 text-emerald5">
          LinkHub
        </div>
        <Button
          type="button"
          onClick={() => router.push('/kakaoLogin')}
          className="button button-md flex w-full max-w-[500px] items-center justify-center border-none bg-yellow-400 px-3 py-2.5">
          <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-800" />
          <div className="text-sm font-bold text-gray-800">
            카카오로 시작하기
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Login
