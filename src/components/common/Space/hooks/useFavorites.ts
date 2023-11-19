import { useState } from 'react'
import {
  fetchFavoriteSpace,
  fetchUnFavoriteSpace,
} from '@/services/favorites/favorites'
import useToggle from '../../Toggle/hooks/useToggle'

export interface UseFavoritesProps {
  spaceId: number
  hasFavorite: boolean
  favorite: number
  onClickFavorite?: (_e?: React.MouseEvent<HTMLButtonElement>) => void
}

const useFavorites = ({
  spaceId,
  hasFavorite,
  favorite,
  onClickFavorite,
}: UseFavoritesProps) => {
  const [isFavorites, favoritesToggle] = useToggle(hasFavorite)
  const [favoritesCount, setFavoritesCount] = useState<number>(favorite)
  const [isLoading, setLoading] = useState(false)

  const handleClickFavoriteButton = async () => {
    if (isLoading) return

    setLoading(true)
    favoritesToggle()

    if (isFavorites) {
      await fetchUnFavoriteSpace({ spaceId })
      setFavoritesCount((prev) => prev - 1)
    } else {
      await fetchFavoriteSpace({ spaceId })
      setFavoritesCount((prev) => prev + 1)
    }

    await onClickFavorite?.()
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }

  return { isFavorites, favoritesCount, handleClickFavoriteButton }
}

export default useFavorites
