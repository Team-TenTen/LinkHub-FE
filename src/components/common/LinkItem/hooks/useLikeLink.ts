import { useCallback, useMemo } from 'react'
import { useDeleteLikeLink, usePostLikeLink } from '@/services/link/useLink'
import { debounce } from 'lodash'

export interface UseLikeLinkProps {
  spaceId?: number
  linkId: number
}

const useLikeLink = ({ spaceId, linkId }: UseLikeLinkProps) => {
  const { mutate: deleteLikeLink } = useDeleteLikeLink({ spaceId })
  const { mutate: postLikeLink } = usePostLikeLink({ spaceId })

  const debounceUnLikeLink = useMemo(
    () =>
      debounce(async () => {
        await deleteLikeLink({ linkId })
      }, 300),
    [deleteLikeLink, linkId],
  )

  const debounceLikeLink = useMemo(
    () =>
      debounce(async () => {
        await postLikeLink({ linkId })
      }, 300),
    [postLikeLink, linkId],
  )

  const handleClickLike = useCallback(
    (isLike: boolean) => {
      if (isLike) {
        debounceUnLikeLink()
      } else {
        debounceLikeLink()
      }
    },
    [debounceUnLikeLink, debounceLikeLink],
  )

  return { handleClickLike }
}

export default useLikeLink
