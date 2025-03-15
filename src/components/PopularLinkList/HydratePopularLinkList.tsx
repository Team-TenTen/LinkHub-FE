import React from 'react'
import { QUERY_KEYS } from '@/constants'
import { getQueryClient } from '@/lib/queryClient'
import { fetchGetPopularLinks } from '@/services/link/useLink'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import PopularLinkList from '../PopularLink/PopularLinkList/PopularLinkList'

const HydratePopularLinkList = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.POPULAR_LINKS],
    queryFn: fetchGetPopularLinks,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PopularLinkList />
    </HydrationBoundary>
  )
}

export default React.memo(HydratePopularLinkList)
