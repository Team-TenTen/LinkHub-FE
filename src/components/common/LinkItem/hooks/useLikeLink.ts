import { useCallback, useMemo, useState } from 'react'
import { fetchLikeLink, fetchUnLikeLink } from '@/services/link/link'
import { useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'
import useToggle from '../../Toggle/hooks/useToggle'

export interface UseLikeLinkProps {
  spaceId?: number
  linkId: number
  isLikedValue?: boolean
  likeCountValue: number
}

const useLikeLink = ({
  spaceId,
  linkId,
  isLikedValue,
  likeCountValue,
}: UseLikeLinkProps) => {
  const queryClient = useQueryClient()
  const [isLiked, likeToggle] = useToggle(isLikedValue)
  const [likeCount, setLikeCount] = useState<number>(likeCountValue)

  const debounceUnLikeLink = useMemo(
    () =>
      debounce(async () => {
        if (spaceId) {
          await fetchUnLikeLink({ linkId })
          await queryClient.invalidateQueries({ queryKey: ['links', spaceId] })
        }
      }, 300),
    [spaceId, linkId, queryClient],
  )

  const debounceLikeLink = useMemo(
    () =>
      debounce(async () => {
        if (spaceId) {
          await fetchLikeLink({ linkId })
          await queryClient.invalidateQueries({ queryKey: ['links', spaceId] })
        }
      }, 300),
    [spaceId, linkId, queryClient],
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
