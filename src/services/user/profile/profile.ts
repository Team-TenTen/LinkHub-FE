import { apiClient } from '@/services/apiServices'
import { RegisterReqBody } from '@/types'

const fetchGetUserProfile = async ({ userId }: { userId: number }) => {
  const path = `/api/user/profile/${userId}`

  try {
    const response = await apiClient.get(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchPostUserProfile = async (
  userId: number,
  data: RegisterReqBody,
  file?: File,
) => {
  const path = `/api/user/profile/${userId}`
  const reqData = { ...data }
  const formData = new FormData()
  formData.append('request', JSON.stringify(reqData))
  file && formData.append('file', file)

  try {
    const response = await apiClient.put(path, formData, {}, {}, 'multipart')
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetUserProfile }
