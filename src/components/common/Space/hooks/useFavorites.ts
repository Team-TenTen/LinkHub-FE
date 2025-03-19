import { useCallback, useMemo, useState } from 'react'
import {
  useDeleteFavoriteSpace,
  usePostFavoriteSpace,
} from '@/services/space/useSpace'
import { debounce } from 'lodash'
import useToggle from '../../Toggle/hooks/useToggle'

export interface UseFavoritesProps {
  spaceId: number
  hasFavorite?: boolean
  favorite: number
}

const useFavorites = ({
  spaceId,
  hasFavorite,
  favorite,
}: UseFavoritesProps) => {
  const [isFavorites, favoritesToggle] = useToggle(hasFavorite)
  const [favoritesCount, setFavoritesCount] = useState<number>(favorite)
  const { mutateAsync: postFavoriteSpace } = usePostFavoriteSpace()
  const { mutateAsync: deleteFavoriteSpace } = useDeleteFavoriteSpace()

  const debounceUnFetchSpace = useMemo(
    () =>
      debounce(async () => {
        await deleteFavoriteSpace({ spaceId })
      }, 300),
    [spaceId, deleteFavoriteSpace],
  )

  const debouncefetchSpace = useMemo(
    () =>
      debounce(async () => {
        await postFavoriteSpace({ spaceId })
      }, 300),
    [spaceId, postFavoriteSpace],
  )

  const handleClickFavorite = useCallback(
    (isFavorites: boolean) => {
      favoritesToggle()
      if (isFavorites) {
        setFavoritesCount((prev) => prev - 1)
        debounceUnFetchSpace()
      } else {
        setFavoritesCount((prev) => prev + 1)
        debouncefetchSpace()
      }
    },
    [favoritesToggle, debounceUnFetchSpace, debouncefetchSpace],
  )

  return { isFavorites, favoritesCount, handleClickFavorite }
}

export default useFavorites
