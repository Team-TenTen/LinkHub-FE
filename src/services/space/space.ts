import { ChangeRoleProps } from '@/components/common/SpaceMemberList/SpaceMemberList'
import { CreateSpaceReqBody } from '@/types'
import { apiClient } from '../apiServices'

export interface FetchGetSpaceProps {
  spaceId?: number
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

const fetchSettingSpace = async (
  spaceId: number,
  data: CreateSpaceReqBody,
  file?: File,
) => {
  const path = `/api/space/${spaceId}`
  const reqData = { ...data }
  const formData = new FormData()
  formData.append('request', JSON.stringify(reqData))
  file && formData.append('file', file)
  const response = await apiClient.patch(path, formData, {}, {}, 'multipart')
  return response
}

const fetchDeleteSpace = async (spaceId: number) => {
  const path = `/api/space/${spaceId}`
  const response = await apiClient.delete(path)
  return response
}

const fetchFavoriteSpace = async ({ spaceId }: FetchGetSpaceProps) => {
  const path = `/api/space/${spaceId}/favorites`

  try {
    const response = await apiClient.post(path, {})
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchUnFavoriteSpace = async ({ spaceId }: FetchGetSpaceProps) => {
  const path = `/api/space/${spaceId}/favorites`

  try {
    const response = await apiClient.delete(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchGetTags = async ({ spaceId }: FetchGetSpaceProps) => {
  const path = `/api/space/${spaceId}/tags`

  try {
    const response = await apiClient.get(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchPatchRole = async (spaceId: number, data: ChangeRoleProps) => {
  const path = `/api/space/${spaceId}/member/role`

  try {
    const response = await apiClient.patch(path, data)
    return response
  } catch (e) {}
}

export {
  fetchGetSpace,
  feachCreateSpace,
  fetchFavoriteSpace,
  fetchUnFavoriteSpace,
  fetchSettingSpace,
  fetchDeleteSpace,
  fetchGetTags,
  fetchPatchRole,
}
