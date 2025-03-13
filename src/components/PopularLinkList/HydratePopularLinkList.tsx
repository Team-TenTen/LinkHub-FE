import React from 'react'
import { getPopularLinks } from '@/app/apis/link.api'
import { QUERY_KEYS } from '@/constants'
import { getQueryClient } from '@/lib/queryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import PopularLinkList from '../PopularLink/PopularLinkList/PopularLinkList'

const HydratePopularLinkList = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.POPULAR_LINKS],
    queryFn: getPopularLinks,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PopularLinkList />
    </HydrationBoundary>
  )
}

export default React.memo(HydratePopularLinkList)
