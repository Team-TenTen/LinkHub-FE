import { useCallback, useMemo, useState } from 'react'
import {
  fetchFavoriteSpace,
  fetchUnFavoriteSpace,
} from '@/services/space/space'
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
      }, 300),
    [spaceId],
  )

  const debouncefetchSpace = useMemo(
    () =>
      debounce(async () => {
        await fetchFavoriteSpace({ spaceId })
      }, 300),
    [spaceId],
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
