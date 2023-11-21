import { FetchDeleteLinbkProps, fetchDeleteLink } from '@/services/link/link'

const useDeleteLink = () => {
  const handleDeleteLink = async ({
    spaceId,
    linkId,
  }: FetchDeleteLinbkProps) => {
    await fetchDeleteLink({ spaceId, linkId })
  }

  return { handleDeleteLink }
}

export default useDeleteLink
