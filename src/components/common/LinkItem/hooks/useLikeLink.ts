import { useCallback } from 'react'
import { useDeleteLikeLink, usePostLikeLink } from '@/services/link/useLink'

export interface UseLikeLinkProps {
  spaceId?: number
  linkId: number
}

const useLikeLink = ({ spaceId, linkId }: UseLikeLinkProps) => {
  const { mutate: deleteLikeLink } = useDeleteLikeLink({ spaceId })
  const { mutate: postLikeLink } = usePostLikeLink({ spaceId })

  const handleRemoveLike = useCallback(() => {
    deleteLikeLink({ linkId })
  }, [deleteLikeLink, linkId])

  const handleAddLike = useCallback(() => {
    postLikeLink({ linkId })
  }, [postLikeLink, linkId])

  const handleClickLike = useCallback(
    (isLike: boolean) => {
      if (isLike) {
        handleRemoveLike()
      } else {
        handleAddLike()
      }
    },
    [handleRemoveLike, handleAddLike],
  )

  return { handleClickLike }
}

export default useLikeLink
