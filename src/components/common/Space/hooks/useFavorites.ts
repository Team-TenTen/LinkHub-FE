import { useState } from 'react'
import {
  fetchFavoriteSpace,
  fetchUnFavoriteSpace,
} from '@/services/favorites/favorites'
import { debounce } from 'lodash'
import useToggle from '../../Toggle/hooks/useToggle'

export interface UseFavoritesProps {
  spaceId: number
  hasFavorite: boolean
  favorite: number
}

const useFavorites = ({
  spaceId,
  hasFavorite,
  favorite,
}: UseFavoritesProps) => {
  const [isFavorites, favoritesToggle] = useToggle(hasFavorite)
  const [favoritesCount, setFavoritesCount] = useState<number>(favorite)

  const handleClickFavoriteButton = async () => {
    favoritesToggle()

    if (isFavorites) {
      await fetchUnFavoriteSpace({ spaceId })
      setFavoritesCount((prev) => prev - 1)
    } else {
      await fetchFavoriteSpace({ spaceId })
      setFavoritesCount((prev) => prev + 1)
    }
  }

  const debounceHandleClickFavoriteButton = debounce(() => {
    handleClickFavoriteButton()
  }, 300)

  return { isFavorites, favoritesCount, debounceHandleClickFavoriteButton }
}

export default useFavorites
