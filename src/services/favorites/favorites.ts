import { apiClient } from '../apiServices'

export interface FetchFavoriteSpaceProps {
  spaceId: number
}

const fetchFavoriteSpace = async ({ spaceId }: FetchFavoriteSpaceProps) => {
  const path = `/api/favorites/${spaceId}`
  const body = { spaceId }

  try {
    const response = await apiClient.post(path, body)
    return response.json()
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchUnFavoriteSpace = async ({ spaceId }: FetchFavoriteSpaceProps) => {
  const path = `/api/favorites/${spaceId}`

  try {
    const response = await apiClient.delete(path)
    return response.json()
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchFavoriteSpace, fetchUnFavoriteSpace }
