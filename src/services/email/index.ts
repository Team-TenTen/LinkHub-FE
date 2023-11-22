import {
  EmailReqBody,
  EmailVerifyReqBody,
} from '@/components/UserInfoForm/UserInfoForm'
import { apiClient } from '../apiServices'

const fetchPostEmail = async (data: EmailReqBody) => {
  const path = '/api/email'

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_INTERNAL_ADDRESS}${path}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return response
}

const fetchPostEmailVerify = async (
  data: EmailVerifyReqBody & EmailReqBody,
) => {
  const path = '/api/email-verify'

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_INTERNAL_ADDRESS}${path}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const verification = await response.json()
  return verification
}

export { fetchPostEmail, fetchPostEmailVerify }
