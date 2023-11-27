import { fetchUpdateLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'
import { RefetchTagsType } from '../../Space/hooks/useGetTags'

interface HandleUpdateLinkProps {
  url: string
  title: string
  tagName: string
  color: string
}

interface UseUpdateLinkProps {
  spaceId?: number
  linkId: number
  refetchTags?: RefetchTagsType
}

const useUpdateLink = ({
  spaceId,
  linkId,
  refetchTags,
}: UseUpdateLinkProps) => {
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
    refetchTags?.()
  }

  return { handleUpdateLink }
}

export default useUpdateLink
