import { RegisterReqBody } from '@/components/UserInfoForm/hooks/useRegister'
import { apiClient } from '../apiServices'

const registerUser = async (data: RegisterReqBody, file?: File) => {
  const imageData = new FormData()
  file && imageData.append('file', file)

  const response = await apiClient.post('/api/registerUser', {
    data,
    file,
  })

  return response
}

const validateToken = async () => {
  const response = await apiClient.get('/api/auth-user')
  return response
}

export { registerUser, validateToken }
