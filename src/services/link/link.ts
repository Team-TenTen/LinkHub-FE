import { CreateLinkReqBody, GetLinksReqBody } from '@/types'
import { apiClient } from '../apiServices'

const fetchGetLinks = async ({
  spaceId,
  pageNumber,
  pageSize,
  sort,
  tagId,
}: GetLinksReqBody) => {
  const path = `/api/space/${spaceId}/links`
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    ...(sort && { sort: sort }),
    ...(tagId && { tagId: tagId.toString() }),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export interface FetchCreateLinkProps extends CreateLinkReqBody {
  spaceId?: number
}

const fetchCreateLink = async ({
  spaceId,
  url,
  title,
  tagName,
  color,
}: FetchCreateLinkProps) => {
  const path = `/api/space/${spaceId}/links`
  const body = { spaceId, url, title, tagName, color }

  try {
    const response = await apiClient.post(path, body)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export interface FetchDeleteLinkProps {
  spaceId: number
  linkId: number
}

const fetchDeleteLink = async ({ spaceId, linkId }: FetchDeleteLinkProps) => {
  const path = `/api/space/${spaceId}/links`
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
  const path = `/api/links/${linkId}/like`

  try {
    const response = await apiClient.post(path, {})
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchUnLikeLink = async ({ linkId }: FetchLikeLinkProps) => {
  const path = `/api/links/${linkId}/like`

  try {
    const response = await apiClient.delete(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export interface FetchReadSaveLinkProps extends FetchDeleteLinkProps {}

const fetchReadSaveLink = async ({
  spaceId,
  linkId,
}: FetchReadSaveLinkProps) => {
  const path = `/api/space/${spaceId}/links/readInfo`
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
  fetchGetLinks,
  fetchCreateLink,
  fetchDeleteLink,
  fetchLikeLink,
  fetchUnLikeLink,
  fetchReadSaveLink,
}
