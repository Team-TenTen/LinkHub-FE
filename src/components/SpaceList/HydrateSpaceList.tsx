import getQueryClient from '@/lib/queryClient'
import { fetchGetSpaces } from '@/services/space/spaces'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { SpaceList } from '..'

export default async function HydrateSpaceList({
  sort,
  category,
}: {
  sort: string
  category: string
}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['getSpacesInfiniteQuery'],
    queryFn: () =>
      fetchGetSpaces({
        pageNumber: 0,
        pageSize: 10,
        sort,
        filter: '',
      }),
    initialPageParam: 0,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <SpaceList
        queryKey="main"
        sort={sort ?? ''}
        category={category ?? ''}
        fetchFn={fetchGetSpaces}
      />
    </HydrationBoundary>
  )
}
