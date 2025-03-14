import { postEmail, postEmailVerify } from '@/app/apis/email.api'
import {
  EmailReqBody,
  EmailVerifyReqBody,
} from '@/components/UserInfoForm/UserInfoForm'
import { IEmail } from '@/models/emails.model'
import { useMutation } from '@tanstack/react-query'

export const usePostEmail = () => {
  return useMutation({
    mutationFn: (email: IEmail) => postEmail({ email }),
    onError: (error: Error) => {
      console.log(error)
    },
  })
}

export const usePostEmailVerify = () => {
  return useMutation({
    mutationFn: (data: EmailVerifyReqBody & EmailReqBody) =>
      postEmailVerify({ data }),
    onError: (error: Error) => {
      console.log(error)
    },
  })
}
