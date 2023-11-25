import { useEffect, useState } from 'react'
import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import { CommentResBody } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { CommentListProps } from '../CommentList'

const useCommentsQuery = ({ spaceId, fetchFn }: CommentListProps) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['comments', spaceId],
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
  const [openedComments, setOpenedComments] = useState<boolean[][]>([])

  useEffect(() => {
    const opened = data?.pages[data.pages.length - 1].responses.map(
      (comment: CommentResBody) => (comment.childCount > 0 ? false : undefined),
    )
    if (opened) {
      setOpenedComments((prev) => [...prev, opened])
    }
  }, [data])

  return {
    comments: data,
    openedComments,
    setOpenedComments,
    fetchNextPage,
    hasNextPage,
  }
}

export default useCommentsQuery
