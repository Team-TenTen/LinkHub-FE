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

const createSpace = async (data: CreateSpaceReqBody, file?: File) => {
  const imageData = new FormData()
  file && imageData.append('file', file)

  console.log(file)

  //Todo: 파일 처리
  const response = await apiClient.post('/api/spaces/create', {
    data,
    file,
  })

  return response
}

export { getSpaceDetail, createSpace }
