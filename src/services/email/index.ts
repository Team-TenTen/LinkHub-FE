import {
  EmailReqBody,
  EmailVerifyReqBody,
} from '@/components/UserInfoForm/UserInfoForm'
import { apiClient } from '../apiServices'

const fetchPostEmail = async (data: EmailReqBody) => {
  const path = '/api/email'
  const response = await apiClient.post(path, data)
  return response
}

const fetchPostEmailVerify = async (
  data: EmailVerifyReqBody & EmailReqBody,
) => {
  const path = '/api/email-verify'
  const response = await apiClient.post(path, data)
  return response
}

export { fetchPostEmail, fetchPostEmailVerify }
