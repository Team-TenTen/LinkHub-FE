import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ReplyListProps } from '../ReplyList'

const useRepliesQuery = ({ spaceId, commentId, fetchFn }: ReplyListProps) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['replies', spaceId, commentId],
    queryFn: ({ pageParam }) =>
      fetchFn({
        spaceId,
        commentId,
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.metaData?.hasNext ? lastPage.metaData.pageNumber + 1 : undefined,
  })

  return { replies: data, fetchNextPage, hasNextPage }
}

export default useRepliesQuery
