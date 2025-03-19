import { INITIAL_PAGE_NUMBER, PAGE_SIZE, QUERY_KEYS } from '@/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { CommentListProps } from '../CommentList'

const useCommentsQuery = ({ spaceId, fetchFn }: CommentListProps) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.COMMENTS, spaceId],
    queryFn: ({ pageParam }) =>
      fetchFn({
        spaceId,
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.metaData?.hasNext ? lastPage.metaData.pageNumber + 1 : undefined,
  })

  return {
    comments: data,
    fetchNextPage,
    hasNextPage,
  }
}

export default useCommentsQuery
