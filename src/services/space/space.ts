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
  const reqData = {
    spaceName: 'java 개발자 출근길 보기 좋은 글 모음',
    description: 'java 개발자 하루 30분 매일 하나씩 보기 좋은 글 모음입니다.',
    category: 'KNOWLEDGE_ISSUE_CAREER',
    isVisible: true,
    isComment: true,
    isLinkSummarizable: true,
    isReadMarkEnabled: true,
  }
  const formData = new FormData()
  formData.append('request', JSON.stringify(reqData))
  file && formData.append('file', file)
  const response = await apiClient.post(path, formData, {}, {}, 'multipart')
  return response
}

export { getSpaceDetail, feachCreateSpace }
