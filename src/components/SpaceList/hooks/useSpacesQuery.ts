import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { fetchGetSpaces } from '@/services/space/spaces'
import { useInfiniteQuery } from '@tanstack/react-query'
import { SpaceListProps } from '../SpaceList'

const useSpacesQuery = ({ sort, category }: SpaceListProps) => {
  const sortValue = sort === 'favorite' ? 'favorite_count' : 'created_at'
  const categoryValue = category === 'all' ? '' : category.toUpperCase()
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['spaces', { sort: sortValue, category: categoryValue }],
    queryFn: ({ pageParam }) =>
      fetchGetSpaces({
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
        sort: sortValue,
        filter: categoryValue,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.metaData?.hasNext ? lastPage.metaData.pageNumber + 1 : undefined,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return { spaces: data, ref: target }
}

export default useSpacesQuery
