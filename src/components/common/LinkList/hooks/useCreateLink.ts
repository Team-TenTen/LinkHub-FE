'use client'

import { FetchCreateLinkProps, fetchCreateLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'

export interface UseCreateLinkProps {
  spaceId?: number
}
export interface UseCreateLinkReturnType {
  handleCreateLink: ({
    url,
    title,
    tagName,
    color,
  }: FetchCreateLinkProps) => Promise<void>
}

const useCreateLink = ({
  spaceId,
}: UseCreateLinkProps): UseCreateLinkReturnType => {
  const queryclient = useQueryClient()

  const handleCreateLink = async ({
    url,
    title,
    tagName,
    color,
  }: FetchCreateLinkProps) => {
    await fetchCreateLink({
      spaceId,
      url,
      title,
      tagName,
      color,
    })
    await queryclient.invalidateQueries({ queryKey: ['links', spaceId] })
  }

  return {
    handleCreateLink,
  }
}

export default useCreateLink
