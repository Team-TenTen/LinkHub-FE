import { useState } from 'react'
import { FetchDeleteLinkProps, fetchDeleteLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'
import { RefetchTagsType } from '../../Space/hooks/useGetTags'

export interface UseDeleteLinkProps {
  refetchTags?: RefetchTagsType
}

const useDeleteLink = ({ refetchTags }: UseDeleteLinkProps) => {
  const queryClient = useQueryClient()
  const [isDeleteLinkLoading, setIsDeleteLinkLoading] = useState(false)

  const handleDeleteLink = async ({
    spaceId,
    linkId,
  }: FetchDeleteLinkProps) => {
    if (isDeleteLinkLoading) return

    setIsDeleteLinkLoading(true)
    await fetchDeleteLink({ spaceId, linkId })
    await queryClient.invalidateQueries({ queryKey: ['links', spaceId] })
    refetchTags?.()
    setIsDeleteLinkLoading(false)
  }

  return { isDeleteLinkLoading, handleDeleteLink }
}

export default useDeleteLink
