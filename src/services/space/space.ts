import { CreateSpaceReqBody } from '@/types'
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

const feachCreateSpace = async (data: CreateSpaceReqBody, file?: File) => {
  const path = '/api/spaces/create'
  const reqData = { ...data }
  const formData = new FormData()
  formData.append('request', JSON.stringify(reqData))
  file && formData.append('file', file)
  const response = await apiClient.post(path, formData, {}, {}, 'multipart')
  return response
}

export { fetchGetSpace, feachCreateSpace }
