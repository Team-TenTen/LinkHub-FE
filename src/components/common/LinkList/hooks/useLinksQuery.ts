import { INITIAL_PAGE_NUMBER, PAGE_SIZE } from '@/constants'
import { GetLinksReqBody } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'

export interface UseLinksQueryProps {
  spaceId?: number
  sort?: string
  tagId?: number
  fetchFn: ({ pageNumber, pageSize }: GetLinksReqBody) => Promise<any>
}
const useLinksQuery = ({
  spaceId,
  sort,
  tagId,
  fetchFn,
}: UseLinksQueryProps) => {
  const sortValue = sort === 'like' ? 'popular' : 'created_at'
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [
      'links',
      spaceId,
      { ...(sortValue && { sort: sortValue }), ...(tagId && { tagId: tagId }) },
    ],
    queryFn: ({ pageParam }) =>
      fetchFn({
        spaceId,
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
        sort: sortValue,
        tagId: tagId || undefined,
      }),
    initialPageParam: INITIAL_PAGE_NUMBER,
    getNextPageParam: (lastPage) =>
      lastPage.pageMetaData?.hasNext
        ? lastPage.pageMetaData.pageNumber + 1
        : undefined,
  })

  return { links: data, fetchNextPage, hasNextPage, isLinksLoading: isLoading }
}

export default useLinksQuery
