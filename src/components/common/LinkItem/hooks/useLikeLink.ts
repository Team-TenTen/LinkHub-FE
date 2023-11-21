import { useCallback, useMemo, useState } from 'react'
import { fetchLikeLink, fetchUnLikeLink } from '@/services/link/link'
import { debounce } from 'lodash'
import useToggle from '../../Toggle/hooks/useToggle'

export interface UseLikeLinkProps {
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

  const debounceUnLikeLink = useMemo(
    () =>
      debounce(async () => {
        await fetchUnLikeLink({ linkId })
      }, 500),
    [linkId],
  )

  const debounceLikeLink = useMemo(
    () =>
      debounce(async () => {
        await fetchLikeLink({ linkId })
      }, 500),
    [linkId],
  )

  const handleLikeClick = useCallback(
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

  return { isLiked, likeCount, handleLikeClick }
}

export default useLikeLink
