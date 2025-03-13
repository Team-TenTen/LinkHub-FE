import { useEffect } from 'react'
import { usePutLink } from '@/services/link/useLink'
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
}

const useUpdateLink = ({ spaceId, linkId }: UseUpdateLinkProps) => {
  const { mutate: updateLink, isPending: isUpdateLinkLoading } =
    usePutLink(spaceId)

  const handleUpdateLink = async ({
    url,
    title,
    tagName,
    color = 'emerald',
  }: HandleUpdateLinkProps) => {
    if (isUpdateLinkLoading) return
    updateLink({ spaceId, linkId, url, title, tagName, color })
  }

  return { isUpdateLinkLoading, handleUpdateLink }
}

export default useUpdateLink
