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

const createSpace = async (data: CreateSpaceReqBody, file?: string) => {
  const imageData = new FormData()
  // const request = {
  //   spaceName,
  //   description,
  //   category,
  //   isVisible,
  //   isComment,
  //   isLinkSummarizable,
  //   isReadMarkEnabled
  // }

  //formData.append('request', JSON.stringify(data))
  file && imageData.append('file', file)

  console.log(imageData.get('file'))

  const response = await apiClient.post('/api/spaces/create', {
    data,
    imageData,
  })

  return response
}

export { getSpaceDetail, createSpace }
