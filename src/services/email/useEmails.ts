import {
  EmailReqBody,
  EmailVerifyReqBody,
} from '@/components/UserInfoForm/UserInfoForm'
import { IEmail } from '@/models/emails.model'
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../apiServices'

// 이메일 전송
export const usePostEmail = () => {
  return useMutation({
    mutationFn: async (email: IEmail) => {
      const response = await apiClient.post(`/api/email`, email)
      return response
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

// 이메일 인증
export const usePostEmailVerify = () => {
  return useMutation({
    mutationFn: async (data: EmailVerifyReqBody & EmailReqBody) => {
      const response = await apiClient.post(`/api/email/verify`, data)
      return response
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
