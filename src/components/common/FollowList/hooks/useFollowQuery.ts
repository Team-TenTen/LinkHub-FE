import { FollowListProps } from '@/components/common/FollowList/FollowList'
import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import { useInfiniteQuery } from '@tanstack/react-query'

const useFollowQuery = ({ memberId, fetchFn, type }: FollowListProps) => {
  const queryKey = type === 'following' || 'follower'
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [queryKey, memberId],
    queryFn: ({ pageParam }) =>
      fetchFn({
        memberId,
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.metaData?.hasNext ? lastPage.metaData.pageNumber + 1 : undefined,
  })

  return {
    followList: data,
    fetchNextPage,
    hasNextPage,
    isFollowLoading: isLoading,
  }
}

export default useFollowQuery
