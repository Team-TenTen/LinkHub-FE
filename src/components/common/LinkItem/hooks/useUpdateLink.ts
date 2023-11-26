import { fetchUpdateLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'

interface HandleUpdateLinkProps {
  url: string
  title: string
  tagName: string
  color: string
}

interface UseUpdateLinkProps {
  spaceId?: number
  linkId: number
}

const useUpdateLink = ({ spaceId, linkId }: UseUpdateLinkProps) => {
  const queryClient = useQueryClient()
  const handleUpdateLink = async ({
    url,
    title,
    tagName,
    color = 'emerald',
  }: HandleUpdateLinkProps) => {
    await fetchUpdateLink({
      spaceId,
      linkId,
      url,
      title,
      tagName,
      color,
    })
    await queryClient.invalidateQueries({ queryKey: ['links', spaceId] })
  }

  return { handleUpdateLink }
}

export default useUpdateLink
