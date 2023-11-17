import { RegisterReqBody } from '@/components/UserInfoForm/hooks/useRegister'
import { apiClient } from '../apiServices'

const registerUser = async (data: RegisterReqBody, file?: File) => {
  const imageData = new FormData()
  file && imageData.append('file', file)

  console.log(file)

  const response = await apiClient.post('/api/registerUser', {
    data,
    file,
  })

  return response
}

export { registerUser }
