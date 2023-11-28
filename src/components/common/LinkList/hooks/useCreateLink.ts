'use client'

import { FetchCreateLinkProps, fetchCreateLink } from '@/services/link/link'
import { fetchGetTags } from '@/services/space/space'
import { useQueryClient } from '@tanstack/react-query'
import { RefetchTagsType } from '../../Space/hooks/useGetTags'

export interface UseCreateLinkProps {
  spaceId?: number
  refetchTags?: RefetchTagsType
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
  refetchTags,
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

    await fetchGetTags({
      spaceId,
    })
    await queryclient.invalidateQueries({ queryKey: ['links', spaceId] })
    refetchTags?.()
  }

  return {
    handleCreateLink,
  }
}

export default useCreateLink
