import { FetchDeleteLinkProps, fetchDeleteLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'
import { RefetchTagsType } from '../../Space/hooks/useGetTags'

export interface UseDeleteLinkProps {
  refetchTags?: RefetchTagsType
}

const useDeleteLink = ({ refetchTags }: UseDeleteLinkProps) => {
  const queryClient = useQueryClient()

  const handleDeleteLink = async ({
    spaceId,
    linkId,
  }: FetchDeleteLinkProps) => {
    await fetchDeleteLink({ spaceId, linkId })
    await queryClient.invalidateQueries({ queryKey: ['links', spaceId] })
    refetchTags?.()
  }

  return { handleDeleteLink }
}

export default useDeleteLink
