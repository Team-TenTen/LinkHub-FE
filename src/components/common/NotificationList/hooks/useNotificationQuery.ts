import { FollowListProps } from '@/components/common/FollowList/FollowList'
import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import { useInfiniteQuery } from '@tanstack/react-query'

const useNotificationQuery = ({ fetchFn, type }: FollowListProps) => {
  const queryKey = type
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) =>
      fetchFn({
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.metaData?.hasNext ? lastPage.metaData.pageNumber + 1 : undefined,
  })

  return { notificationList: data, fetchNextPage, hasNextPage }
}

export default useNotificationQuery
