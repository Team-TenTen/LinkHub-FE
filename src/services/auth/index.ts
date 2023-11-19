import { RegisterReqBody } from '@/components/UserInfoForm/hooks/useRegister'
import Cookies from 'js-cookie'
import { apiClient } from '../apiServices'

const registerUser = async (data: RegisterReqBody, file?: File) => {
  const socialId = Cookies.get('Social-Id')
  const provider = Cookies.get('Provider')
  const path = '/api/registerUser'
  const reqData = { ...data, socialId, provider }
  const formData = new FormData()
  formData.append('request', JSON.stringify(reqData))
  file && formData.append('file', file)
  const response = await apiClient.post(path, formData, {}, {}, 'multipart')
  return response
}

const validateToken = async () => {
  const response = await apiClient.get('/api/auth-user')
  return response
}

export { registerUser, validateToken }
