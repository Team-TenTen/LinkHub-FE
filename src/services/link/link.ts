import { CreateLinkReqBody } from '@/types'
import { apiClient } from '../apiServices'

export interface FetchCreateLinkProps extends CreateLinkReqBody {
  spaceId: number
}

const fetchCreateLink = async ({
  spaceId,
  url,
  title,
  tag,
  color,
}: FetchCreateLinkProps) => {
  const path = '/api/link'
  const body = { spaceId, url, title, tag, color }

  try {
    const response = await apiClient.post(path, body)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchCreateLink }
