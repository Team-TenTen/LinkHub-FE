import { apiClient } from '../apiServices'

export interface FetchGetSpaceProps {
  spaceId: number
}

const fetchGetSpace = async ({ spaceId }: FetchGetSpaceProps) => {
  const path = `/api/space/${spaceId}`

  try {
    const response = await apiClient.get(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetSpace }
