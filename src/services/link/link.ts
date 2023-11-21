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

export interface FetchDeleteLinbkProps {
  spaceId: number
  linkId: number
}

const fetchDeleteLink = async ({ spaceId, linkId }: FetchDeleteLinbkProps) => {
  const path = '/api/link/delete'
  const params = {
    spaceId: spaceId.toString(),
    linkId: linkId.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.delete(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export interface FetchLikeLinkProps {
  linkId: number
}

const fetchLikeLink = async ({ linkId }: FetchLikeLinkProps) => {
  const path = '/api/link/like'
  const params = {
    linkId: linkId.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.post(`${path}?${queryString}`, {})
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchUnLikeLink = async ({ linkId }: FetchLikeLinkProps) => {
  const path = '/api/link/like'
  const params = {
    linkId: linkId.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.delete(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export interface FetchReadSaveLinkProps extends FetchDeleteLinbkProps {}

const fetchReadSaveLink = async ({
  spaceId,
  linkId,
}: FetchReadSaveLinkProps) => {
  const path = '/api/link/readInfo'
  const params = {
    spaceId: spaceId.toString(),
    linkId: linkId.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.post(`${path}?${queryString}`, {})
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export {
  fetchCreateLink,
  fetchDeleteLink,
  fetchLikeLink,
  fetchUnLikeLink,
  fetchReadSaveLink,
}
