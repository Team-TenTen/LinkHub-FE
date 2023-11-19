import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useInfiniteQuery } from '@tanstack/react-query'
import { SpaceListProps } from '../SpaceList'

const useSpacesQuery = ({
  sort,
  category,
  keyword,
  fetchFn,
}: SpaceListProps) => {
  const sortValue = sort === 'favorite' ? 'favorite_count' : 'created_at'
  const categoryValue = category === 'all' ? '' : category.toUpperCase()
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['spaces', { sort: sortValue, category: categoryValue, keyword }],
    queryFn: ({ pageParam }) =>
      fetchFn({
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
        sort: sortValue,
        filter: categoryValue,
        keyWord: keyword,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.metaData?.hasNext ? lastPage.metaData.pageNumber + 1 : undefined,
  })
  const { target } = useInfiniteScroll({ hasNextPage, fetchNextPage })

  return { spaces: data, ref: target }
}

export default useSpacesQuery
