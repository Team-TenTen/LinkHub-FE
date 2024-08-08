import { PAGE_SIZE } from '@/constants'
import { SpaceResBody } from '@/types'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { SpaceListProps } from '../SpaceList'

interface MainSpacePageType {
  metaData?: {
    hasNext: boolean
    lastId: number
    lastFavoriteCount: number
  }
  responses: SpaceResBody[]
}

const useMainSpacesQuery = ({
  queryKey,
  memberId,
  sort,
  category,
  keyword,
  fetchFn,
}: SpaceListProps) => {
  const sortValue =
    queryKey === 'main' || queryKey === 'search'
      ? sort === 'favorite'
        ? 'favorite_count'
        : 'created_at'
      : undefined
  const categoryValue = category === 'all' ? '' : category.toUpperCase()
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useSuspenseInfiniteQuery({
      queryKey: [
        'spaces',
        queryKey,
        {
          ...(memberId && { memberId: memberId }),
          ...(sortValue && { sort: sortValue }),
          category: categoryValue,
          keyword,
        },
      ],
      queryFn: ({ pageParam }) =>
        fetchFn({
          memberId,
          lastFavoriteCount: pageParam.lastFavoriteCount,
          lastSpaceId: pageParam.lastSpaceId,
          pageSize: PAGE_SIZE,
          sort: sortValue,
          filter: categoryValue,
          keyWord: keyword,
        }),
      initialPageParam: {
        lastSpaceId: undefined,
        lastFavoriteCount: undefined,
      },
      getNextPageParam: (
        lastPage: MainSpacePageType,
      ):
        | {
            lastSpaceId: number | undefined
            lastFavoriteCount: number | undefined
          }
        | undefined => {
        return lastPage.metaData?.hasNext
          ? {
              lastSpaceId: lastPage.metaData.lastId,
              lastFavoriteCount: lastPage.metaData.lastFavoriteCount,
            }
          : undefined
      },
    })

  return {
    spaces: data,
    fetchNextPage,
    hasNextPage,
    isSpacesLoading: isLoading,
  }
}

export default useMainSpacesQuery
