'use client'

import { IUpdateLink } from '@/models/link.model'
import { usePostLink } from '@/services/link/useLink'

export interface UseCreateLinkProps {
  spaceId?: number
}
export interface UseCreateLinkReturnType {
  isCreateLinkLoading: boolean
  handleCreateLink: ({
    url,
    title,
    tagName,
    color,
  }: IUpdateLink['query']) => void
}

const useCreateLink = ({
  spaceId,
}: UseCreateLinkProps): UseCreateLinkReturnType => {
  const { mutate: createLink, isPending: isCreateLinkLoading } =
    usePostLink(spaceId)

  const handleCreateLink = ({
    url,
    title,
    tagName,
    color,
  }: IUpdateLink['query']) => {
    if (isCreateLinkLoading) return
    createLink({ spaceId, url, title, tagName, color })
  }

  return {
    isCreateLinkLoading,
    handleCreateLink,
  }
}

export default useCreateLink
