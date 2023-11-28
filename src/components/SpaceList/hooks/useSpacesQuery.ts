import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { SpaceListProps } from '../SpaceList'

const useSpacesQuery = ({
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
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
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

  return { spaces: data, fetchNextPage, hasNextPage }
}

export default useSpacesQuery
