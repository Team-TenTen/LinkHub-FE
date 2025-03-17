import { RegisterReqBody } from '@/components/UserInfoForm/hooks/useRegister'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { apiClient } from '../apiServices'

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
      const reqData = { ...data, socialId, provider }

      const formData = new FormData()
      formData.append('request', JSON.stringify(reqData))
      file && formData.append('file', file)

      const response = await apiClient.post(
        '/api/registerUser',
        formData,
        {},
        {},
        'multipart',
      )
      return response
    },
    onError: (error: Error) => {
      console.error('Registration error:', error)
    },
  })
}

// 토큰 검증
export const validateToken = async () => {
  const response = await apiClient.get('/api/auth')
  return response
}

// 카카오 로그아웃
export const useKakaoLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(`/api/logout`, {}, {})
      return response
    },
    onError: (error: Error) => {
      console.error('Logout error:', error)
    },
  })
}
