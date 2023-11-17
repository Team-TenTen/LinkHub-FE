import { CreateSpaceReqBody } from '@/types'
import { apiClient } from '../apiServices'

const getSpaceDetail = async (spaceId: string) => {
  try {
    const response = await apiClient.get(`/api/space/${spaceId}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const feachCreateSpace = async (data: CreateSpaceReqBody, file?: File) => {
  const path = '/api/spaces/create'
  const reqData = { ...data, category: 'KNOWLEDGE_ISSUE_CAREER' }
  const formData = new FormData()
  formData.append('request', JSON.stringify(reqData))
  file && formData.append('file', file)
  const response = await apiClient.post(path, formData, {}, {}, 'multipart')
  return response
}

export { getSpaceDetail, feachCreateSpace }
