'use client'

import { LinkIcon } from '@heroicons/react/20/solid'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import Button from '../common/Button/Button'
import { useLogin } from './hooks/useLogin'

const Login = () => {
  const { loginKakao } = useLogin()

  //Todo: 카카오 로그인 토큰을 받아서 토큰이 db에 존재하면 로그인, 존재하지 않으면 회원가입

  return (
    <div className="flex h-screen translate-y-[-9%] flex-col justify-center gap-10 pl-4 pr-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <LinkIcon className="h-10 w-10 text-emerald5" />
        </div>
        <div className="text-4xl font-normal leading-10 text-emerald5">
          LinkHub
        </div>
      </div>
      <Button
        type="button"
        className="button button-md flex w-full items-center justify-center border-none bg-yellow-400 px-3 py-2.5">
        <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-800" />
        <div
          onClick={() => loginKakao()}
          className="text-sm font-bold text-gray-800">
          카카오로 시작하기
        </div>
      </Button>
    </div>
  )
}

export default Login