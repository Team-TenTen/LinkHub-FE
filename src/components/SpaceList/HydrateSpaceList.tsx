import getQueryClient from '@/lib/queryClient'
import { fetchGetSpaces } from '@/services/space/spaces'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import SpaceListController from './SpaceListController'

export default async function HydrateSpaceList() {
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['getSpacesInfiniteQuery'],
    queryFn: () =>
      fetchGetSpaces({
        pageNumber: 0,
        pageSize: 10,
        sort: 'recent',
        filter: '',
      }),
    initialPageParam: 0,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <SpaceListController />
    </HydrationBoundary>
  )
}
