import { useState } from 'react'
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
  const [isUpdateLinkLoading, setIsUpdateLinkLoading] = useState(false)
  const handleUpdateLink = async ({
    url,
    title,
    tagName,
    color = 'emerald',
  }: HandleUpdateLinkProps) => {
    if (isUpdateLinkLoading) return

    setIsUpdateLinkLoading(true)
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
    setIsUpdateLinkLoading(false)
  }

  return { isUpdateLinkLoading, handleUpdateLink }
}

export default useUpdateLink
