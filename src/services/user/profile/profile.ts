import { apiClient } from '@/services/apiServices'
import { RegisterReqBody } from '@/types'

export interface FetchGetUserProfileProps {
  memberId: number
}

const fetchGetUserProfile = async ({ memberId }: FetchGetUserProfileProps) => {
  const path = `/api/user/${memberId}/profile`

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
  const path = `/api/user/${userId}/profile`
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

export { fetchGetUserProfile, fetchPostUserProfile }
