import {
  EmailReqBody,
  EmailVerifyReqBody,
} from '@/components/UserInfoForm/UserInfoForm'
import { IEmail } from '@/models/emails.model'
import { useMutation } from '@tanstack/react-query'

// 이메일 전송
export const usePostEmail = () => {
  return useMutation({
    mutationFn: async (email: IEmail) => {
      const response = await fetch(`/api/email`, {
        method: 'POST',
        body: JSON.stringify(email),
      })
      return response.json()
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
      const response = await fetch(`/api/email/verify`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
