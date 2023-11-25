import { FetchDeleteLinkProps, fetchDeleteLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'

const useDeleteLink = () => {
  const queryClient = useQueryClient()

  const handleDeleteLink = async ({
    spaceId,
    linkId,
  }: FetchDeleteLinkProps) => {
    await fetchDeleteLink({ spaceId, linkId })
    await queryClient.invalidateQueries({ queryKey: ['links', spaceId] })
  }

  return { handleDeleteLink }
}

export default useDeleteLink
