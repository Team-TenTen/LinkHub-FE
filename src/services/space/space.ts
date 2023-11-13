import { apiClient } from '../apiServices'

const getSpaceDetail = async (spaceId: string) => {
  try {
    const response = await apiClient.get(`/api/space/${spaceId}`, {})
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { getSpaceDetail }
