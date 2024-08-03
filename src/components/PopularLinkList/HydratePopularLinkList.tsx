import getQueryClient from '@/lib/queryClient'
import { fetchGetPopularLinks } from '@/services/link/link'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import PopularLinkListController from './PopularLinkListController'

const HydratePopularLinkList = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['useGetPopularLinks'],
    queryFn: () => fetchGetPopularLinks(),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <PopularLinkListController />
    </HydrationBoundary>
  )
}

export default HydratePopularLinkList
