import { RegisterReqBody } from '@/components/UserInfoForm/hooks/useRegister'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'

// 회원가입
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async ({
      data,
      file,
    }: {
      data: RegisterReqBody
      file?: File
    }) => {
      const socialId = Cookies.get('Social-Id')
      const provider = Cookies.get('Provider')
      const path = '/api/registerUser'
      const reqData = { ...data, socialId, provider }

      const formData = new FormData()
      formData.append('request', JSON.stringify(reqData))
      file && formData.append('file', file)

      const response = await fetch(path, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to register user')
      }

      return response.json()
    },
    onError: (error: Error) => {
      console.error('Registration error:', error)
    },
  })
}

// 토큰 검증
export const validateToken = async () => {
  const response = await fetch('/api/auth', {
    method: 'GET',
  })
  return await response.json()
}

// 카카오 로그아웃
export const useKakaoLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      return response.json()
    },
    onError: (error: Error) => {
      console.error('Logout error:', error)
    },
  })
}
