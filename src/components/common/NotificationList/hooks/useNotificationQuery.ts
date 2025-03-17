import { FollowListProps } from '@/components/common/FollowList/FollowList'
import { INITIAL_PAGE_NUMBER, PAGE_SIZE, QUERY_KEYS } from '@/constants'
import { useInfiniteQuery } from '@tanstack/react-query'

const useNotificationQuery = ({ fetchFn }: FollowListProps) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.INVITATIONS],
    queryFn: ({ pageParam }) =>
      fetchFn({
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.metaData?.hasNext ? lastPage.metaData.pageNumber + 1 : undefined,
  })

  return {
    notificationList: data,
    fetchNextPage,
    hasNextPage,
    isNotificationLoading: isLoading,
  }
}

export default useNotificationQuery
