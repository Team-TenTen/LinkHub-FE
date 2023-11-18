import { apiClient } from '../apiServices'

export interface FetchGetMetaProps {
  url: string
}

const fetchGetMeta = async ({ url }: FetchGetMetaProps) => {
  const path = '/api/meta'
  const body = { url }

  try {
    const response = await apiClient.post(path, body)
    return response.json()
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetMeta }
