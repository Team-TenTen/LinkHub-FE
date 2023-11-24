import { FetchDeleteLinbkProps, fetchDeleteLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'

const useDeleteLink = () => {
  const queryClient = useQueryClient()

  const handleDeleteLink = async ({
    spaceId,
    linkId,
  }: FetchDeleteLinbkProps) => {
    await fetchDeleteLink({ spaceId, linkId })
    await queryClient.invalidateQueries({ queryKey: ['links'] })
  }

  return { handleDeleteLink }
}

export default useDeleteLink
