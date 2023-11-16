import { apiClient } from '@/services/apiServices'

const fetchGetMyProfile = async () => {
  const path = '/api/user/profile'

  try {
    const response = await apiClient.get(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetMyProfile }
