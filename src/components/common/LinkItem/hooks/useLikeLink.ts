import { useCallback, useMemo, useState } from 'react'
import { useDeleteLikeLink, usePostLikeLink } from '@/services/link/useLink'
import { debounce } from 'lodash'
import useToggle from '../../Toggle/hooks/useToggle'

export interface UseLikeLinkProps {
  spaceId?: number
  linkId: number
  isLikedValue?: boolean
  likeCountValue: number
}

const useLikeLink = ({
  linkId,
  isLikedValue,
  likeCountValue,
}: UseLikeLinkProps) => {
  const [isLiked, likeToggle] = useToggle(isLikedValue)
  const [likeCount, setLikeCount] = useState<number>(likeCountValue)

  const { mutate: deleteLikeLink } = useDeleteLikeLink()
  const { mutate: postLikeLink } = usePostLikeLink()

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
      likeToggle()
      if (isLike) {
        setLikeCount((prev) => prev - 1)
        debounceUnLikeLink()
      } else {
        setLikeCount((prev) => prev + 1)
        debounceLikeLink()
      }
    },
    [likeToggle, debounceUnLikeLink, debounceLikeLink],
  )

  return { isLiked, likeCount, handleClickLike }
}

export default useLikeLink
