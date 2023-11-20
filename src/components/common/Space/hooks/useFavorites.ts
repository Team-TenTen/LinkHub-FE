import { useCallback, useMemo, useState } from 'react'
import {
  fetchFavoriteSpace,
  fetchUnFavoriteSpace,
} from '@/services/favorites/favorites'
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

  const debounceUnFetchSpace = useMemo(
    () =>
      debounce(async () => {
        await fetchUnFavoriteSpace({ spaceId })
      }, 500),
    [spaceId],
  )

  const debouncefetchSpace = useMemo(
    () =>
      debounce(async () => {
        await fetchFavoriteSpace({ spaceId })
      }, 500),
    [spaceId],
  )

  const handleFavoriteClick = useCallback(
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

  return { isFavorites, favoritesCount, handleFavoriteClick }
}

export default useFavorites
