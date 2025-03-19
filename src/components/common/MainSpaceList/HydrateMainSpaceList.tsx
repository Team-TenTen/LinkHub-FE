import { PAGE_SIZE } from '@/constants'
import { getQueryClient } from '@/lib/queryClient'
import { fetchGetSpaces } from '@/services/space/useSpaces'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import MainSpaceList from './MainSpaceList'

const HydrateMainSpaceList = () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery({
    queryKey: ['spaces', 'main', { category: '', sort: 'created_at' }],
    queryFn: () =>
      fetchGetSpaces({
        lastSpaceId: undefined,
        lastFavoriteCount: undefined,
        pageSize: PAGE_SIZE,
        sort: 'created_at',
        filter: 'all',
      }),
    initialPageParam: 0,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainSpaceList />
    </HydrationBoundary>
  )
}

export default HydrateMainSpaceList
