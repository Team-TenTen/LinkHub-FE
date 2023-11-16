import { apiClient } from '../apiServices'

const fetchGetProfile = async () => {
  const path = '/api/profile'

  try {
    const response = await apiClient.get(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetProfile }
