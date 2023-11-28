import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { UserListProps } from '../UserList'

const useUsersQuery = ({ keyword, fetchFn }: UserListProps) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['users', keyword],
    queryFn: ({ pageParam }) =>
      fetchFn({
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
        keyword,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.metaData?.hasNext ? lastPage.metaData.pageNumber + 1 : undefined,
  })

  return { users: data, fetchNextPage, hasNextPage }
}

export default useUsersQuery
