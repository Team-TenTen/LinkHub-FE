import React from 'react'
import { getQueryClient } from '@/lib/queryClient'
import { fetchGetPopularLinks } from '@/services/link/link'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import PopularLinkList from './PopularLinkList'

const HydratePopularLinkList = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['PopularLinks'],
    queryFn: fetchGetPopularLinks,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PopularLinkList />
    </HydrationBoundary>
  )
}

export default React.memo(HydratePopularLinkList)
